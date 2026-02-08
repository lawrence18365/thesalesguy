// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();

    // Initialize hide on scroll header
    initHideOnScroll();

    // Initialize FAQ accordion
    initFAQAccordion();

    // Initialize timeline scroll animations
    initTimelineAnimations();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Form submission handling with AJAX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const formStatus = document.getElementById('form-status');
            const formData = new FormData(this);

            // Update button state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            formStatus.textContent = '';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thanks for your message! We\'ll be in touch soon.';
                    this.reset();
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Oops! Something went wrong. Please try again or call us at 0478 409 161.';
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }
});

// Hide header on scroll down, show on scroll up
function initHideOnScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollTop = 0;
    // Hide header after scrolling 100px to avoid flickering on small movements
    const SCROLL_THRESHOLD_PX = 100;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Only hide header after scrolling past threshold
        if (scrollTop > SCROLL_THRESHOLD_PX) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
        } else {
            // At top of page - always show header
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.parentElement.querySelector('.faq-answer').classList.remove('active');
                }
            });

            // Toggle current FAQ
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');

    // Check if elements exist
    if (!menuToggle || !mobileOverlay) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Close mobile menu function
    const closeMobileMenu = function() {
        mobileOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Open mobile menu
    const openMobileMenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Toggle button
    menuToggle.addEventListener('click', openMobileMenu);

    // Close button - use multiple event types for better mobile support
    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        // Add touchend for better mobile support
        mobileClose.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close mobile menu - clicking overlay background
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            e.preventDefault();
            closeMobileMenu();
        }
    });

    // Close menu when clicking on a link
    if (mobileLinks.length > 0) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Timeline Scroll Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Check if timeline items exist
    if (timelineItems.length === 0) {
        return;
    }

    // Stagger animation delay for visual effect
    const ANIMATION_STAGGER_DELAY_MS = 100;
    // Trigger animation when 20% of element is visible
    const VISIBILITY_THRESHOLD = 0.2;
    // Bottom margin to trigger animations slightly before element enters viewport
    const TRIGGER_MARGIN = '0px 0px -50px 0px';

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay for smoother staggered effect
                setTimeout(() => {
                    entry.target.classList.add('timeline-animate');
                }, ANIMATION_STAGGER_DELAY_MS);
            }
        });
    }, {
        threshold: VISIBILITY_THRESHOLD,
        rootMargin: TRIGGER_MARGIN
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Add animation on scroll using class-based approach for better performance
const SCROLL_ANIMATION_THRESHOLD = 0.1;
const SCROLL_ANIMATION_MARGIN = '0px 0px -50px 0px';

const observerOptions = {
    threshold: SCROLL_ANIMATION_THRESHOLD,
    rootMargin: SCROLL_ANIMATION_MARGIN
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use class instead of direct style manipulation for better performance
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.problem-card, .feature, .faq-item, .standout-item');
    animatedElements.forEach(el => {
        // Add animation-ready class to set initial state
        el.classList.add('animate-ready');
        observer.observe(el);
    });
});
