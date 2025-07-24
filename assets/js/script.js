// CloudFlexIT - Advanced Interactive Website Script
// Modern animations, interactions, and dynamic effects

(function() {
    'use strict';

    // Global variables
    let isLoaded = false;
    let currentTestimonial = 0;
    let testimonialInterval;
    let particleSystem;
    let mouseTracker = { x: 0, y: 0 };
    let scrollProgress = 0;

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeWebsite();
    });

    // Main initialization function
    function initializeWebsite() {
        initAOS();
        initNavigation();
        initHeroAnimations();
        initParticleSystem();
        initScrollEffects();
        initTestimonials();
        initContactForm();
        initBackToTop();
        initStatCounters();
        initMouseTracker();
        initTypingEffect();
        initThemeToggle();
        initLoadingScreen();
        initIntersectionObserver();
        initSmoothScrolling();
        initParallaxEffects();
        initInteractiveCursor();
        initFloatingCards();
        initMorphingBlobs();
        initDynamicBackground();
        
        // Mark as loaded
        isLoaded = true;
        document.body.classList.add('loaded');
    }

    // Initialize AOS (Animate On Scroll)
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                offset: 100,
                easing: 'ease-out-cubic',
                once: true,
                mirror: false
            });
        }
    }

    // Enhanced Navigation with smooth animations
    function initNavigation() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll header effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Mobile menu toggle with animation
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                
                // Animate hamburger
                const spans = navToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    span.style.transform = navMenu.classList.contains('active') 
                        ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? '100%' : '0'}, ${index === 0 ? '6px' : index === 2 ? '-6px' : '0'})`
                        : 'none';
                    span.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
                });
            });
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        smoothScrollTo(target.offsetTop - 80);
                        
                        // Close mobile menu
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.classList.remove('nav-open');
                    }
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', updateActiveLink);
    }

    // Update active navigation link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Advanced Hero Animations
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroStats = document.querySelectorAll('.stat-item');
        const heroActions = document.querySelector('.hero-actions');

        if (heroTitle) {
            // Split text for character animation
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = text.split('').map((char, index) => 
                `<span style="animation-delay: ${index * 0.05}s" class="char-animate">${char}</span>`
            ).join('');
        }

        // Animate hero elements on load
        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.style.opacity = '1';
            heroStats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, index * 200);
            });
            if (heroActions) {
                setTimeout(() => {
                    heroActions.style.opacity = '1';
                    heroActions.style.transform = 'translateY(0)';
                }, 800);
            }
        }, 1000);
    }

    // Advanced Particle System
    function initParticleSystem() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.className = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(canvas);

        const particles = [];
        const particleCount = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() * 60 + 200
            };
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Mouse interaction
                const dx = mouseTracker.x - particle.x;
                const dy = mouseTracker.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    particle.vx += dx * 0.0001;
                    particle.vy += dy * 0.0001;
                }
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.1 * (100 - distance) / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        particleSystem = { canvas, particles };
    }

    // Enhanced Scroll Effects
    function initScrollEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        const revealElements = document.querySelectorAll('[data-reveal]');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax effects
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Reveal animations
            revealElements.forEach(element => {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const windowHeight = window.innerHeight;

                if (scrolled > elementTop - windowHeight + elementHeight / 4) {
                    element.classList.add('revealed');
                }
            });

            // Update scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollProgress = (winScroll / height) * 100;
            
            // Update progress bar if exists
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrollProgress + '%';
            }
        });
    }

    // Enhanced Testimonials Slider
    function initTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
                card.style.transform = `translateX(${(i - index) * 100}%)`;
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentTestimonial = index;
        }

        function nextTestimonial() {
            const next = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(next);
        }

        function prevTestimonial() {
            const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prev);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });

        // Auto-play
        testimonialInterval = setInterval(nextTestimonial, 5000);

        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            slider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }

        // Initialize
        if (testimonialCards.length > 0) {
            showTestimonial(0);
        }
    }

    // Enhanced Contact Form
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Enhanced input animations
        inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-wrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            // Floating label effect
            input.addEventListener('focus', () => {
                wrapper.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    wrapper.classList.remove('focused');
                }
            });

            // Real-time validation
            input.addEventListener('input', () => {
                validateField(input);
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(form)) return;

            // Loading state
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                
            } catch (error) {
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            }
        });
    }

    // Form validation
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let message = '';

        if (required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        } else if (type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }

        updateFieldStatus(field, isValid, message);
        return isValid;
    }

    function validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function updateFieldStatus(field, isValid, message) {
        const wrapper = field.closest('.input-wrapper') || field.parentNode;
        const errorMsg = wrapper.querySelector('.error-message') || document.createElement('div');
        
        if (!wrapper.querySelector('.error-message')) {
            errorMsg.className = 'error-message';
            wrapper.appendChild(errorMsg);
        }

        wrapper.classList.toggle('error', !isValid);
        wrapper.classList.toggle('valid', isValid && field.value);
        errorMsg.textContent = message;
        errorMsg.style.display = message ? 'block' : 'none';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        
        const form = document.getElementById('contact-form');
        form.insertBefore(message, form.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            smoothScrollTo(0);
        });
    }

    // Animated Counter for Statistics
    function initStatCounters() {
        const counters = document.querySelectorAll('[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Mouse Tracker for Interactive Effects
    function initMouseTracker() {
        document.addEventListener('mousemove', (e) => {
            mouseTracker.x = e.clientX;
            mouseTracker.y = e.clientY;

            // Update CSS custom properties for mouse position
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }

    // Typing Effect for Hero Title
    function initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = ['Transforming Technology', 'Empowering Careers', 'Building Futures'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // Theme Toggle (Dark/Light Mode)
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (!loadingScreen) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Intersection Observer for Animations
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Smooth Scrolling Function
    function smoothScrollTo(target) {
        const start = window.pageYOffset;
        const distance = target - start;
        const duration = 1000;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Smooth Scrolling for Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target.offsetTop - 80);
                }
            });
        });
    }

    // Parallax Effects
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    // Interactive Cursor
    function initInteractiveCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
        document.body.appendChild(cursor);

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorOutline = cursor.querySelector('.cursor-outline');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor interactions
        document.querySelectorAll('a, button, .clickable').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // Floating Cards Animation
    function initFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const delay = index * 0.5;
            card.style.animationDelay = delay + 's';
            
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.animationPlayState = 'paused';
                card.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.animationPlayState = 'running';
                card.style.transform = '';
            });
        });
    }

    // Morphing Blobs Background
    function initMorphingBlobs() {
        const blobContainer = document.createElement('div');
        blobContainer.className = 'blob-container';
        document.body.appendChild(blobContainer);

        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.className = 'morphing-blob';
            blob.style.left = Math.random() * 100 + '%';
            blob.style.top = Math.random() * 100 + '%';
            blob.style.animationDelay = i * 2 + 's';
            blobContainer.appendChild(blob);
        }
    }

    // Dynamic Background Color Change
    function initDynamicBackground() {
        const sections = document.querySelectorAll('section');
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    const color = colors[index % colors.length];
                    document.documentElement.style.setProperty('--dynamic-bg', color);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    // Utility Functions
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
        };
    }

    // Export functions for external use
    window.CloudFlexIT = {
        smoothScrollTo,
        showMessage,
        animateCounter,
        updateActiveLink
    };

})();

// Custom CSS for interactive elements
const customStyles = `
<style>
.char-animate {
    display: inline-block;
    opacity: 0;
    animation: charFadeIn 0.5s ease-out forwards;
}

@keyframes charFadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
    from {
        opacity: 0;
        transform: translateY(20px);
    }
}

.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
}

.cursor-dot {
    width: 4px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.cursor-outline {
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: -15px;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease-out;
}

.custom-cursor.cursor-hover .cursor-outline {
    width: 50px;
    height: 50px;
    top: -25px;
    left: -25px;
}

.blob-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
}

.morphing-blob {
    position: absolute;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
    border-radius: 50%;
    filter: blur(40px);
    animation: morphBlob 20s infinite linear;
}

@keyframes morphBlob {
    0%, 100% {
        border-radius: 50% 50% 50% 50%;
        transform: rotate(0deg) scale(1);
    }
    25% {
        border-radius: 60% 40% 60% 40%;
        transform: rotate(90deg) scale(1.1);
    }
    50% {
        border-radius: 40% 60% 40% 60%;
        transform: rotate(180deg) scale(0.9);
    }
    75% {
        border-radius: 60% 40% 60% 40%;
        transform: rotate(270deg) scale(1.05);
    }
}

.input-wrapper {
    position: relative;
    margin-bottom: 1rem;
}

.input-wrapper.focused input,
.input-wrapper.focused textarea,
.input-wrapper.focused select {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-wrapper.error input,
.input-wrapper.error textarea,
.input-wrapper.error select {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-wrapper.valid input,
.input-wrapper.valid textarea,
.input-wrapper.valid select {
    border-color: var(--secondary-color);
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: none;
}

.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.1s ease-out;
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease-out;
}

.loading-screen::before {
    content: 'CloudFlexIT';
    color: white;
    font-size: 2rem;
    font-weight: 800;
    animation: pulse 2s infinite;
}

@media (max-width: 768px) {
    .custom-cursor {
        display: none;
    }
    
    .morphing-blob {
        width: 150px;
        height: 150px;
    }
}
</style>
`;

// Inject custom styles
document.head.insertAdjacentHTML('beforeend', customStyles);