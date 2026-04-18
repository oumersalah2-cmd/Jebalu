import contentData from './content.json';

const contentContainer = document.getElementById('content-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const languageSelect = document.getElementById('language-select');
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const body = document.body;

let currentPage = 0;
let currentLanguage = 'amharic';
const totalPages = contentData.amharic.length; // Assuming same length

function renderPage() {
    // Add fade out effect
    contentContainer.style.opacity = 0;
    
    setTimeout(() => {
        const pageData = contentData[currentLanguage][currentPage];
        
        // Remove previous language classes
        contentContainer.className = '';
        if (currentLanguage === 'amharic') {
            contentContainer.classList.add('lang-am');
        }

        if (currentPage === 0) {
            // Render Cover Page
            contentContainer.innerHTML = `
                <div class="cover-page">
                    <div class="author-photo-wrapper">
                        <img src="./author-placeholder.jpg" alt="Ahmedin Jebal (Placeholder)" class="author-photo" />
                    </div>
                    <h1 class="book-title">${pageData.title}</h1>
                    <p class="book-subtitle">${pageData.subtitle}</p>
                    <div class="intro-text">
                        ${pageData.text.map(paragraph => `<p>${paragraph}</p>`).join('')}
                    </div>
                </div>
            `;
        } else {
            // Render Text Page
            contentContainer.innerHTML = `
                <div class="text-page">
                    ${pageData.text.map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
            `;
        }
        
        // Update pagination UI
        pageIndicator.textContent = `Page ${currentPage + 1} / ${totalPages}`;
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        // Fade back in
        contentContainer.style.opacity = 1;
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderPage();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
});

languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    renderPage();
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const isDark = body.classList.contains('dark-mode');
    moonIcon.style.display = isDark ? 'none' : 'block';
    sunIcon.style.display = isDark ? 'block' : 'none';
});

// Initial Render
renderPage();
