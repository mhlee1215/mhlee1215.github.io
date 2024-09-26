// Initialize i18next with backend plugin for loading translations from external files
i18next
    .use(i18nextHttpBackend)
    .init({
        debug: true,
        lng: 'en', // Default language
        backend: {
            loadPath: '/locales/{{lng}}.json' // Path to language files
        }
    }, function(err, t) {
        if (err) return console.error(err);

        // Once initialized, update the content
        updateContent();
    });

// Function to update the content based on the selected language
function updateContent() {
    document.getElementById('vi_header_p').innerHTML = i18next.t('vi_header_p');
    document.getElementById('production_swiper_global_network_p').innerHTML = i18next.t('production_swiper_global_network_p');
    
    // document.getElementById('description').textContent = i18next.t('description');
}

// Function to change the language and reload content
function changeLanguage(lang) {
    i18next.changeLanguage(lang, function(err) {
        if (err) return console.error(err);

        // Update content after language change
        updateContent();
    });
}