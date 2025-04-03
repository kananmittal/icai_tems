// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    // Toggle mobile menu
    menuToggle?.addEventListener('click', () => {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    overlay?.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Header Scroll Behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 100; // Minimum scroll before showing/hiding header

    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't do anything if we haven't scrolled enough
        if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;
        
        // Scrolling down
        if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
            header.classList.add('header--hidden');
        }
        // Scrolling up
        else {
            header.classList.remove('header--hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}); 