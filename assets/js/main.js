/**
 * شركة الفلاحين الحديثة لصناعة الأعلاف ذ.م.م
 * الملف التفاعلي الرئيسي
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. تفعيل تأثير التمرير للترويسة
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. ظهور العناصر تدريجياً عند التمرير (Reveal on Scroll)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-revealed'));
  }

  // 3. تحديد التبويب النشط في شريط الهاتف وشريط سطح المكتب
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.tab, .nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // 4. معالجة نموذج طلب عروض الأسعار والتواصل عبر واتساب
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('qName')?.value.trim() || '';
      const phone = document.getElementById('qPhone')?.value.trim() || '';
      const feedType = document.getElementById('qFeedType')?.value || '';
      const quantity = document.getElementById('qQuantity')?.value.trim() || '';
      const notes = document.getElementById('qNotes')?.value.trim() || '';

      const lines = [
        'السلام عليكم ورحمة الله وبركاته،',
        'أود الاستفسار وطلب عرض سعر من شركة الفلاحين الحديثة لصناعة الأعلاف:',
        `• الاسم / المزرعة: ${name}`,
        phone ? `• رقم الهاتف: ${phone}` : '',
        `• نوع العلف: ${feedType}`,
        quantity ? `• الكمية التقريبية: ${quantity}` : '',
        notes ? `• تفاصيل إضافية: ${notes}` : '',
      ].filter(Boolean);

      const msg = encodeURIComponent(lines.join('\n'));
      const waUrl = `https://wa.me/218927144064?text=${msg}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
