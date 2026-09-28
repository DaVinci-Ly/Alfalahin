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

  // 4. معالجة نموذج طلب عروض الأسعار والتواصل عبر نظام FormSubmit
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>جاري إرسال الطلب...</span>';
      }

      let alertBox = document.getElementById('formAlert');
      if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'formAlert';
        quoteForm.prepend(alertBox);
      }
      alertBox.className = 'form-alert form-alert--success';

      try {
        const formData = new FormData(quoteForm);
        const response = await fetch('https://formsubmit.co/ajax/info@alfalahin.ly', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          quoteForm.reset();
          alertBox.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.5rem;height:1.5rem;flex-shrink:0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
              <strong>تم إرسال طلبك بنجاح!</strong><br>
              شكراً لتواصلك مع شركة الفلاحين الحديثة. سيتواصل معك قسم المبيعات في أقرب وقت.
            </div>
          `;
          alertBox.style.display = 'flex';
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          quoteForm.submit();
        }
      } catch (err) {
        quoteForm.submit();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  // 5. زر تبديل اللغة (English Toggle)
  const langToggle = document.getElementById('langToggle');
  const langToggleDrawer = document.getElementById('langToggleDrawer');
  const showLangNotice = (e) => {
    e.preventDefault();
    alert('النسخة الإنجليزية قيد المراجعة والترجمة المعتمدة وستتوفر قريباً.\nEnglish version is being finalized and will be available soon.');
  };
  if (langToggle) langToggle.addEventListener('click', showLangNotice);
  if (langToggleDrawer) langToggleDrawer.addEventListener('click', showLangNotice);

  // 5. التحكم في درج القائمة الجانبية للهاتف (Mobile App Drawer)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

  const openDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
});
