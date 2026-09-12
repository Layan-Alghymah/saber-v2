import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVerification, verifyClaim, safeUrl } from '../src/verification.js';
import { fixture } from '../src/fixtures.js';

test('normalizes the supplied single-source verified contract without inventing a title',()=>{
 const report=normalizeVerification({status_code:'verified',status_title:'تم التحقق',confidence_score:95,news_date:'15 يناير 2025',explanation_text:'شرح',source_name:'وكالة الأنباء السعودية',source_url:'https://spa.gov.sa',source_tier:'official',recommendation_text:null,color_hex:'#28A745'},'النص المدخل');
 assert.equal(report.title,'النص المدخل'); assert.equal(report.confidenceScore,95); assert.equal(report.sources[0].tier,'official'); assert.equal(report.sources[0].url,'https://spa.gov.sa/'); assert.equal(report.recommendedAction,null);
});
test('normalizes rumor and unconfirmed contracts with multiple sources and nullable dates',()=>{
 for(const status of ['rumor','unconfirmed']) {const report=normalizeVerification({status_code:status,status_title:'عنوان',confidence_score:45,news_date:null,explanation_text:'شرح',sources:[{name:'مصدر',url:'https://example.org',tier:'media'}],recommendation_text:'انتظر'});assert.equal(report.status,status);assert.equal(report.newsDate,null);assert.equal(report.sources.length,1);assert.equal(report.recommendedAction,'انتظر');}
});
test('all six supported fixture states normalize',()=>{for(const status of ['verified','rumor','unconfirmed','no_match','suggested','error'])assert.equal(normalizeVerification(fixture(status)).status,status);});
test('guards URLs, malformed payloads, confidence and optional data',()=>{
 assert.equal(safeUrl('javascript:alert(1)'),null);assert.equal(safeUrl('data:text/html,test'),null);assert.throws(()=>normalizeVerification({status_code:'unknown'}));assert.throws(()=>normalizeVerification(null));
 const report=normalizeVerification({status_code:'verified',confidence_score:101,sources:[null,{name:'unsafe',url:'javascript:alert(1)'}],similar_news:[null,{title:'match',source_url:'data:test'}]});assert.equal(report.confidenceScore,100);assert.equal(report.sources[0].url,null);assert.equal(report.similarNews[0].source_url,null);
});
test('POST integration sends only the trimmed input and normalizes returned JSON',async()=>{
 let request;
 const report=await verifyClaim('  اختبار  ',{apiUrl:'/api/verify',fetchImpl:async(url,options)=>{request={url,...options};return {ok:true,json:async()=>fixture('rumor','عنوان جديد')};}});
 assert.equal(request.url,'/api/verify');assert.equal(request.method,'POST');assert.equal(request.body,JSON.stringify({input:'اختبار'}));assert.equal(request.headers['Content-Type'],'application/json');assert.equal(report.title,'عنوان جديد');assert.equal(report.isDemo,false);
});
test('does not replace HTTP or invalid JSON failures with a demo result',async()=>{
 await assert.rejects(verifyClaim('test',{apiUrl:'/api/verify',fetchImpl:async()=>({ok:false,status:503})}));
 await assert.rejects(verifyClaim('test',{apiUrl:'/api/verify',fetchImpl:async()=>({ok:true,json:async()=>{throw new SyntaxError('invalid');}})}));
});
test('rejects empty and overlong input before making requests',async()=>{await assert.rejects(verifyClaim('   '));await assert.rejects(verifyClaim('x'.repeat(10001)));});
test('times out stalled requests and respects cancellation',async()=>{
 const stalled=(_url,{signal})=>new Promise((resolve,reject)=>{const fail=()=>reject(new DOMException('Aborted','AbortError'));if(signal.aborted)fail();else signal.addEventListener('abort',fail);});
 await assert.rejects(verifyClaim('test',{apiUrl:'/api/verify',fetchImpl:stalled,timeoutMs:10}),/وقتاً/);
 const controller=new AbortController();controller.abort();await assert.rejects(verifyClaim('test',{apiUrl:'/api/verify',fetchImpl:stalled,signal:controller.signal}),{name:'AbortError'});
});
