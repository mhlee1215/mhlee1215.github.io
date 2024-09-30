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
function updateContent(lang) {
    
    // Fetch JSON data from external file
    fetch('/locales/dev.json')
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        console.log('JSON Data Loaded:');
        iterateKeysAndValues(data, lang); // Call the function to iterate keys and values
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

    // document.getElementById('vi_header_p').innerHTML = i18next.t('vi_header_p');
    // document.getElementById('production_swiper_global_network_p').innerHTML = i18next.t('production_swiper_global_network_p');
    
    // document.getElementById('description').textContent = i18next.t('description');
}

// Function to change the language and reload content
function changeLanguage(lang) {
    // document.documentElement.classList.remove(...document.documentElement.classList);
    // document.documentElement.classList.add(`lang-${lang}`);
    i18next.changeLanguage(lang, function(err) {
        if (err) return console.error(err);

        // Update content after language change
        updateContent(lang);
        updateLanguageSpecificClass(lang)
        
    });
}

function updateLanguageSpecificClass(lang){
    const elements = document.querySelectorAll('*');

    // Loop through each element
    elements.forEach(element => {
        // Iterate over classList to find any "lang-*" classes
        element.classList.forEach(className => {
            if (className.startsWith('lang-')) {
                // Remove any existing language-specific class
                element.classList.remove(className);
            }
        });

        // Add the new language-specific class
        element.classList.add(`lang-${lang}`);
    });
}

function iterateKeysAndValues(obj, lang) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // If the value is an object (and not an array), recursively iterate its keys
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                console.log(`${key}: {`);
                iterateKeysAndValues(obj[key]);
                console.log('}');
            } else {
                // Otherwise, print the key and value
                // console.log(`${key}: ${obj[key]} -- ${i18next.t(key)} -- ${document.getElementById(key)}`);
                // document.getElementById(key).innerHTML = i18next.t(key);

                const elements = document.querySelectorAll(`[id="${key}"]`);
                elements.forEach((element, index) => {
                    element.innerHTML = i18next.t(key);
                    // element.classList.remove(...element.classList);
                    // element.classList.add(`lang-${lang}`);
                });
            }
        }
    }
}