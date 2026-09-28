/**
 * شركة الفلاحين الحديثة لصناعة الأعلاف ذ.م.م
 */

const MESSAGES = {
  ar: {
    intro: 'السلام عليكم، أرغب في طلب عرض سعر:',
    name: 'الاسم', feed: 'نوع العلف', qty: 'الكمية', phone: 'رقم الهاتف', notes: 'ملاحظات',
  },
  en: {
    intro: 'Hello, I would like to request a quote:',
    name: 'Name', feed: 'Feed type', qty: 'Quantity', phone: 'Phone', notes: 'Notes',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // نموذج طلب السعر: يجهّز رسالة مرتبة ويفتحها في واتساب
  const quoteForm = document.getElementById('quoteForm');
  if (!quoteForm) return;

  const m = MESSAGES[document.documentElement.lang] || MESSAGES.ar;

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = (id) => (document.getElementById(id)?.value || '').trim();

    const lines = [
      m.intro,
      '',
      `${m.name}: ${value('qName')}`,
      `${m.feed}: ${value('qFeedType')}`,
    ];
    if (value('qQuantity')) lines.push(`${m.qty}: ${value('qQuantity')}`);
    if (value('qPhone')) lines.push(`${m.phone}: ${value('qPhone')}`);
    if (value('qNotes')) lines.push(`${m.notes}: ${value('qNotes')}`);

    const url = `https://wa.me/218927144064?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
});
