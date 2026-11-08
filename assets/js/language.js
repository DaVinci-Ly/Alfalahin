(function () {
  var language = null;

  try {
    var savedLanguage = localStorage.getItem('alfalahin-language');
    if (savedLanguage === 'ar' || savedLanguage === 'en') language = savedLanguage;
  } catch (error) {
    console.warn('Could not read the language preference', error);
  }

  if (!language) {
    language = 'ar';
    var browserLanguages = navigator.languages || [navigator.language];
    for (var i = 0; i < browserLanguages.length; i++) {
      var browserLanguage = (browserLanguages[i] || '').toLowerCase();
      if (browserLanguage.indexOf('ar') === 0) {
        language = 'ar';
        break;
      }
      if (browserLanguage.indexOf('en') === 0) {
        language = 'en';
        break;
      }
    }
  }

  var requestedLanguage = location.search.match(/[?&]lang=(ar|en)(?:&|$)/);
  if (requestedLanguage) language = requestedLanguage[1];
  if (language === 'en') {
    var page = location.pathname.replace(/^\/+/, '') || 'index.html';
    location.replace('/en/' + page + location.search + location.hash);
  }
})();
