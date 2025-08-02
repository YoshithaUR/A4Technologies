// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const floatingBtns = document.querySelectorAll('.floating-btn');

// Slideshow Elements
const slides = document.querySelectorAll('.slide');
const slideDots = document.querySelectorAll('.slide-dot');
const prevSlideBtn = document.querySelector('.prev-slide');
const nextSlideBtn = document.querySelector('.next-slide');

// Slideshow Variables
let currentSlide = 0;
let slideInterval;

// Slideshow Functions
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        }
    });
    
    slideDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

function initSlideshow() {
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
        
        // Event listeners for manual navigation
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopSlideshow();
                startSlideshow();
            });
        });
        
        if (prevSlideBtn && nextSlideBtn) {
            prevSlideBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideshow();
                startSlideshow();
            });
            
            nextSlideBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideshow();
                startSlideshow();
            });
        }
        
        // Pause slideshow on hover
        const slideshow = document.querySelector('.hero-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
        }
    }
}

// Theme Toggle Functionality
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Intersection Observer for Counter Animation
function observeCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Project Filtering
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scrolling for Navigation Links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Navbar Background on Scroll
function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(15, 23, 42, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)';
    }
}

// Form Submission Handler
function handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
        }, 2000);
    }, 1500);
}

// Newsletter Subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const button = e.target.querySelector('button');
    
    if (input.value.trim()) {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            button.style.background = '';
            input.value = '';
        }, 2000);
    }
}

// Floating Contact Button Interactions
function handleFloatingContact(e) {
    e.preventDefault();
    const type = this.classList.contains('whatsapp') ? 'WhatsApp' : 'Email';
    const message = `Hello! I'm interested in your services.`;
    
    if (type === 'WhatsApp') {
        const phone = '+1234567890'; // Replace with actual phone number
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        const email = 'hello@techcorp.com'; // Replace with actual email
        const subject = 'Inquiry about services';
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoUrl;
    }
}

// Add loading animation to service cards
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    const gradientText = heroTitle.querySelector('.gradient-text');
    
    if (gradientText) {
        const textToType = gradientText.textContent;
        gradientText.textContent = '';
        
        setTimeout(() => {
            typeWriter(gradientText, textToType, 150);
        }, 1000);
    }
}

// Enhanced scroll-triggered animations with scroll-out effects
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay for scroll-in
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animation classes based on element type
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.classList.add('animate-slide-bottom');
                    } else if (entry.target.classList.contains('project-card')) {
                        entry.target.classList.add('animate-scale');
                    } else if (entry.target.classList.contains('team-card')) {
                        entry.target.classList.add('animate-slide-right');
                    } else if (entry.target.classList.contains('stat-card')) {
                        entry.target.classList.add('animate-rotate');
                    } else if (entry.target.classList.contains('tech-item')) {
                        entry.target.classList.add('animate-slide-left');
                    } else if (entry.target.classList.contains('value-item')) {
                        entry.target.classList.add('animate-slide-bottom');
                    } else if (entry.target.classList.contains('testimonial-card')) {
                        entry.target.classList.add('animate-scale');
                    }
                }, index * 100);
            } else {
                // Add scroll-out animations when element leaves viewport
                setTimeout(() => {
                    entry.target.classList.remove('animate-in');
                    
                    // Add specific scroll-out animation classes
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.classList.add('animate-slide-out-top');
                    } else if (entry.target.classList.contains('project-card')) {
                        entry.target.classList.add('animate-scale-out');
                    } else if (entry.target.classList.contains('team-card')) {
                        entry.target.classList.add('animate-slide-out-left');
                    } else if (entry.target.classList.contains('stat-card')) {
                        entry.target.classList.add('animate-rotate-out');
                    } else if (entry.target.classList.contains('tech-item')) {
                        entry.target.classList.add('animate-slide-out-right');
                    } else if (entry.target.classList.contains('value-item')) {
                        entry.target.classList.add('animate-slide-out-top');
                    } else if (entry.target.classList.contains('testimonial-card')) {
                        entry.target.classList.add('animate-scale-out');
                    }
                }, 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .team-card, .contact-item, .stat-card, .tech-item, .value-item, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Tilt effect for hero card
function initTiltEffect() {
    const tiltCard = document.getElementById('tiltCard');
    if (!tiltCard) return;

    tiltCard.addEventListener('mousemove', (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 20;
        const rotateY = (centerX - x) / centerX * 20;
        
        tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .project-card, .team-card, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in, .project-card.animate-in, .team-card.animate-in, .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize counters
    observeCounters();
    
    // Initialize animations
    animateServiceCards();
    initScrollAnimations();
    initTiltEffect();
    
    // Initialize typing effect
    initTypingEffect();

    // Initialize slideshow
    initSlideshow();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            smoothScroll.call(link, e);
            closeMobileMenu();
        });
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter projects
            filterProjects(btn.dataset.filter);
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
    
    // Floating contact buttons
    floatingBtns.forEach(btn => {
        btn.addEventListener('click', handleFloatingContact);
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        parallaxEffect();
        navbarScroll();
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .project-card, .team-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn, .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    parallaxEffect();
    navbarScroll();
}, 16));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTheme();
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);
