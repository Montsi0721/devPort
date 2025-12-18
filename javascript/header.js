const header = document.createElement('header');
header.innerHTML = `
    <div class="logo">
        <img class="logo-icon" src="assets/logo.png" alt="logo">
        <span class="logo-text">Montsi portfolio</span>
    </div>
    <button class="hamburger-menu" aria-label="Toggle menu">
        <i class="fas fa-bars"></i>
    </button>
    <div class="theme-menu" id="themeMenu">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <i class="fas fa-moon"></i>
            <span>Toggle Theme</span>
        </button>
    </div>
`;

document.body.insertBefore(header, document.body.firstChild);

// Add hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const themeMenu = document.getElementById('themeMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            themeMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (themeMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.hamburger-menu') && 
            !event.target.closest('.theme-menu') &&
            themeMenu.classList.contains('active')) {
            themeMenu.classList.remove('active');
            const icon = document.querySelector('.hamburger-menu i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});