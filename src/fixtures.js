// Screenshot-inspired fixtures only. These are not real fact-checks.
export const candidates = [
  { id: 'virus-denial', title: 'وزارة الصحة تنفي شائعات انتشار فيروس جديد في المنطقة الشرقية', explanation: 'أكدت وزارة الصحة عدم صحة الأنباء المتداولة حول انتشار فيروس مجهول في المنطقة الشرقية، مشددة على أن الوضع الصحي مستقر ولا يوجد أي توجه لإغلاق المدارس.', source_name: 'وكالة الأنباء الرسمية', source_url: 'https://www.spa.gov.sa', news_date: 'منذ يومين', match_score: 95 },
  { id: 'school-closure', title: 'تعليق الدراسة الحضورية في بعض مدارس المنطقة الشرقية بسبب الأحوال الجوية', explanation: 'أعلنت إدارة التعليم بالمنطقة الشرقية تعليق الدراسة الحضورية وتحويلها عن بُعد في عدد من المدارس يوم الخميس نظراً للحالة المطرية التي تشهدها المنطقة.', source_name: 'صحيفة اليوم', source_url: 'https://www.alyaum.com', news_date: 'الأسبوع الماضي', match_score: 78 },
  { id: 'flu-campaign', title: 'إطلاق حملة تطعيم ضد الإنفلونزا الموسمية في مدارس الشرقية', explanation: 'دشنت المديرية العامة للشؤون الصحية بالمنطقة الشرقية حملة واسعة للتطعيم ضد الإنفلونزا الموسمية تستهدف طلاب وطالبات المدارس بالتعاون مع إدارة التعليم.', source_name: 'وزارة الصحة - بوابة الأخبار', source_url: 'https://www.moh.gov.sa', news_date: 'منذ شهر', match_score: 45 },
];
export const sampleInput = 'انتشار واسع لفيروس جديد في المنطقة الشرقية وإغلاق المدارس لعدة أسابيع كإجراء احترازي من قبل وزارة الصحة.';
export const exampleTitle = 'إطلاق الإصدار الجديد من نظام الذكاء الاصطناعي التوليدي بقدرات فائقة في معالجة اللغة العربية';
export function fixture(status = 'verified', input = exampleTitle) {
  const common = { title: input, confidence_score: 98, news_date: '15 أكتوبر 2023', explanation_text: 'أعلنت الشركة الرائدة في مجال التقنية اليوم عن إطلاق نسختها الأحدث من النماذج اللغوية الكبيرة، والتي تتميز بقدرة استثنائية على فهم وتوليد النصوص باللغة العربية، مما يفتح آفاقاً جديدة للمطورين وصناع المحتوى في المنطقة.', recommendation_text: null,
    sources: [{ name: 'وكالة الأنباء الرسمية', url: 'https://www.spa.gov.sa', tier: 'official' }, { name: 'البوابة التقنية الوطنية', url: 'https://www.mcit.gov.sa', tier: 'government' }, { name: 'المركز الإعلامي للوزارة', url: 'https://www.media.gov.sa', tier: 'government' }],
    similar_news: [
      { ...candidates[0], id: 'ai-investment', title: 'استثمارات ضخمة في البنية التحتية لنماذج الذكاء الاصطناعي العربية', explanation: 'تفاصيل الخطط الاستراتيجية لدعم وتطوير النماذج اللغوية الخاصة باللغة العربية والمنطقة.', match_score: 92 },
      { ...candidates[1], id: 'ai-tools', title: 'مؤتمر المطورين يعلن عن أدوات جديدة لمعالجة النصوص العربية', explanation: 'تجمع كبار خبراء الصناعة لمناقشة مستقبل التقنيات اللغوية وتأثيرها على المحتوى العربي الرقمي.', match_score: 85 },
      { ...candidates[2], id: 'ai-work', title: 'تحليل: كيف سيغير الذكاء الاصطناعي التوليدي سوق العمل في الشرق الأوسط', explanation: 'دراسة معمقة حول التأثيرات الاقتصادية والفرص الوظيفية التي تخلقها التقنيات المتقدمة.', match_score: 78 },
    ], status_code: status, status_title: 'تم التحقق', color_hex: '#68bf69' };
  if (status === 'rumor') Object.assign(common, { status_title: 'إشاعة — تم نفيه رسميًا', confidence_score: 92, explanation_text: 'هذا تقرير تجريبي يوضح طريقة عرض الادعاء المنفي والمصادر التي يستند إليها التحقق. لا يمثل حكماً حقيقياً على النص المُدخل.', recommendation_text: 'تجنب مشاركة الادعاء قبل الرجوع إلى البيان الرسمي والمصادر الأصلية.', color_hex: '#E74C3C' });
  if (status === 'unconfirmed') Object.assign(common, { status_title: 'غير مؤكد', confidence_score: 45, news_date: null, explanation_text: 'لا تتوفر أدلة كافية للوصول إلى نتيجة حاسمة. هذا مثال توضيحي لحالة عدم كفاية الأدلة.', recommendation_text: 'انتظر معلومات إضافية من مصادر موثوقة قبل مشاركة الخبر.', color_hex: '#E67E22', sources: [] });
  if (status === 'no_match' || status === 'suggested') Object.assign(common, { status_title: 'لم نتمكن من تحديد الخبر المقصود', explanation_text: 'تعذر على الذكاء الاصطناعي مطابقة النص الذي أدخلته مع خبر معروف بسبب اختلاف الصياغة أو نقص بعض التفاصيل.', confidence_score: null, similar_news: candidates, sources: [] });
  if (status === 'error') Object.assign(common, { status_title: 'تعذر إكمال التحقق', explanation_text: 'حدث خطأ أثناء الاتصال بخدمة التحقق. يرجى المحاولة مرة أخرى.', sources: [], similar_news: [], confidence_score: null });
  return common;
}
