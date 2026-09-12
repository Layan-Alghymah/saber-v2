/**
 * n8n integration boundary. Set VITE_VERIFY_API_URL=/api/verify.
 * POST { input: string }; returns the supplied snake_case API contract.
 * The view layer only consumes the normalized object below.
 * @typedef {'verified'|'rumor'|'unconfirmed'|'no_match'|'suggested'|'error'} VerificationStatus
 * @typedef {{name:string,url:string|null,tier:string}} Source
 * @typedef {{id:string,title:string,explanation:string,source_name:string,source_url:string|null,news_date:string|null,match_score:number|null}} SimilarNews
 * @typedef {{status:VerificationStatus,statusTitle:string,confidenceScore:number|null,title:string,explanation:string,newsDate:string|null,recommendedAction:string|null,sources:Source[],similarNews:SimilarNews[],color:string,isDemo:boolean}} VerificationResult
 */
import { fixture, candidates } from './fixtures.js';
export const endpoint = import.meta.env?.VITE_VERIFY_API_URL?.trim() || '';
export const demoMode = !endpoint;
const statuses = { verified: '#68bf69', rumor: '#E74C3C', unconfirmed: '#E67E22', no_match: '#55b4a6', suggested: '#3372b8', error: '#E74C3C' };
const str = value => typeof value === 'string' ? value : '';
const score = value => typeof value === 'number' && Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : null;
export function safeUrl(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
/** @returns {VerificationResult} */
export function normalizeVerification(raw, input = '', isDemo = false) {
  if (!raw || typeof raw !== 'object' || !Object.hasOwn(statuses, raw.status_code)) throw new Error('استجابة خدمة التحقق غير صالحة. يرجى المحاولة لاحقاً.');
  const sourceList = Array.isArray(raw.sources) ? raw.sources : raw.source_name ? [{ name: raw.source_name, url: raw.source_url, tier: raw.source_tier }] : [];
  const sources = sourceList.filter(s => s && typeof s.name === 'string').map(s => ({ name: s.name, url: safeUrl(s.url), tier: str(s.tier) }));
  const related = Array.isArray(raw.similar_news) ? raw.similar_news : [];
  return { status: raw.status_code, statusTitle: str(raw.status_title) || 'نتيجة التحقق', confidenceScore: score(raw.confidence_score), title: str(raw.title) || input,
    explanation: str(raw.explanation_text), newsDate: str(raw.news_date) || null, recommendedAction: str(raw.recommendation_text) || null, sources,
    similarNews: related.filter(s => s && typeof s.title === 'string').map((s, i) => ({ id: str(s.id) || `news-${i}`, title: s.title, explanation: str(s.explanation || s.explanation_text), source_name: str(s.source_name), source_url: safeUrl(s.source_url), news_date: str(s.news_date) || null, match_score: score(s.match_score) })),
    color: statuses[raw.status_code], isDemo };
}
/** Sole public verification function; never silently falls back to mock on API failure. */
export async function verifyClaim(input, { signal, apiUrl = endpoint, fetchImpl = globalThis.fetch, timeoutMs = 30000 } = {}) {
  const text = typeof input === 'string' ? input.trim() : '';
  if (!text) throw new Error('الرجاء كتابة نص الخبر أو إدخال رابطه أولاً.');
  if (text.length > 10000) throw new Error('الحد الأقصى للنص هو ١٠٬٠٠٠ حرف.');
  if (!apiUrl) {
    await new Promise((resolve, reject) => { const timer = setTimeout(resolve, 900); if (signal?.aborted) { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); } else signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); }, { once: true }); });
    // Deterministic fixture selection for visual review, never a local AI engine.
    const selected = candidates.find(item => item.title === text);
    const status = selected ? 'verified' : /\[error\]/i.test(text) ? 'error' : /\[rumor\]|إشاعة|الليمون/i.test(text) ? 'rumor' : /\[unconfirmed\]|غير مؤكد/i.test(text) ? 'unconfirmed' : /\[suggested\]|اقتراح/i.test(text) ? 'suggested' : /\[no_match\]|فيروس/i.test(text) ? 'no_match' : 'verified';
    const data = fixture(status, text);
    if (selected) Object.assign(data, { explanation_text: selected.explanation, news_date: selected.news_date, sources: [{ name: selected.source_name, url: selected.source_url, tier: 'official' }], similar_news: [] });
    return normalizeVerification(data, text, true);
  }
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });
  if (signal?.aborted) controller.abort();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ input: text }), signal: controller.signal });
    if (!response.ok) throw new Error(response.status === 429 ? 'طلبات كثيرة في وقت قصير. انتظر قليلاً ثم حاول مجدداً.' : 'تعذر الاتصال بخدمة التحقق. يرجى المحاولة مرة أخرى.');
    return normalizeVerification(await response.json(), text);
  } catch (error) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    if (error.name === 'AbortError') throw new Error('استغرقت الخدمة وقتاً أطول من المتوقع. حاول مرة أخرى.');
    if (error instanceof TypeError || error instanceof SyntaxError) throw new Error('تعذر قراءة استجابة خدمة التحقق. تحقق من الاتصال وحاول مجدداً.');
    throw error;
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', onAbort); }
}
