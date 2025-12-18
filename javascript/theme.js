// Theme management system
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Initialize theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let nextTheme;
        
        // Cycle through themes: default -> dark -> light -> default
        switch(currentTheme) {
            case 'default':
                nextTheme = 'dark';
                break;
            case 'dark':
                nextTheme = 'light';
                break;
            case 'light':
                nextTheme = 'default';
                break;
            default:
                nextTheme = 'default';
        }
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
        updateThemeIcon(nextTheme);
        
        // Add transition effect
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        const themeText = themeToggle.querySelector('span');
        
        switch(theme) {
            case 'dark':
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark Theme';
                break;
            case 'light':
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light Theme';
                break;
            default:
                themeIcon.className = 'fas fa-palette';
                themeText.textContent = 'Default Theme';
        }
    }
});