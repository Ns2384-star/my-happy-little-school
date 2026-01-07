/* ========================================
   MY HAPPY LITTLE SCHOOL - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initTestimonialsSlider();
    initSmoothScroll();
    initAOS();
});

/* ===== Navigation ===== */
function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show-menu') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }
    });

    function closeMenu() {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    }
}

/* ===== Scroll Effects ===== */
function initScrollEffects() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    // Header shadow on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        highlightActiveLink();
    }

    // Highlight active navigation link based on scroll position
    function highlightActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // Throttle scroll events for performance
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

    // Initial call
    handleScroll();
}

/* ===== Testimonials Slider ===== */
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials__track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonials__btn--prev');
    const nextBtn = document.querySelector('.testimonials__btn--next');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardWidth = 0;
    let visibleCards = 2;

    // Calculate dimensions
    function calculateDimensions() {
        const trackWidth = track.parentElement.offsetWidth;

        if (window.innerWidth <= 1023) {
            visibleCards = 1;
        } else {
            visibleCards = 2;
        }

        cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 24;
    }

    // Scroll to specific card
    function scrollToCard(index) {
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.max(0, Math.min(index, maxIndex));

        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });

        updateButtons();
    }

    // Update button states
    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            const maxIndex = Math.max(0, cards.length - visibleCards);
            nextBtn.disabled = currentIndex >= maxIndex;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });
    }

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            calculateDimensions();
            scrollToCard(currentIndex);
        }, 100);
    });

    // Handle scroll end to update current index
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            currentIndex = Math.round(track.scrollLeft / cardWidth);
            updateButtons();
        }, 100);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                scrollToCard(currentIndex + 1);
            } else {
                // Swipe right - previous
                scrollToCard(currentIndex - 1);
            }
        }
    }

    // Auto-play (optional)
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const maxIndex = Math.max(0, cards.length - visibleCards);
            if (currentIndex >= maxIndex) {
                scrollToCard(0);
            } else {
                scrollToCard(currentIndex + 1);
            }
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Pause autoplay on hover/focus
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('focusin', stopAutoplay);
    track.addEventListener('focusout', startAutoplay);

    // Initialize
    calculateDimensions();
    updateButtons();
    startAutoplay();
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/* ===== Initialize AOS (Animate On Scroll) ===== */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
    }
}

/* ===== Utility Functions ===== */

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===== Form Validation (for future use) ===== */
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

/* ===== Lazy Loading Images (fallback for older browsers) ===== */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ===== Console Easter Egg ===== */
console.log('%c🏠 My Happy Little School', 'font-size: 24px; font-weight: bold; color: #1717F2;');
console.log('%cLearning and Growing through love and care 💙', 'font-size: 14px; color: #808080;');
console.log('%cYes you can! ⭐', 'font-size: 14px; color: #FFCB05;');