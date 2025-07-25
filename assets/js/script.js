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

        initJobsPortal();
        initResourcesSection();
        initLanguageSelector();
        initLiveNotifications();
        initCaseStudiesSlider();
        initPWA();
        
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
            // Simple fade-in animation instead of character splitting
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
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

        // Store the original text
        const originalText = typingElement.textContent || 'Transforming Technology';
        
        // Set the initial text content properly
        typingElement.textContent = originalText;
        
        // Remove any conflicting CSS animations
        typingElement.style.animation = 'none';
        typingElement.style.overflow = 'visible';
        typingElement.style.whiteSpace = 'normal';
        typingElement.style.borderRight = 'none';
        
        // Simple fade-in effect instead of typing
        typingElement.style.opacity = '0';
        setTimeout(() => {
            typingElement.style.transition = 'opacity 1s ease-in';
            typingElement.style.opacity = '1';
        }, 500);
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

    // Jobs Portal Functionality
    function initJobsPortal() {
        const locationFilter = document.getElementById('location-filter');
        const skillFilter = document.getElementById('skill-filter');
        const visaFilter = document.getElementById('visa-filter');
        const salaryMin = document.getElementById('salary-min');
        const salaryMax = document.getElementById('salary-max');
        const jobsGrid = document.getElementById('jobs-grid');
        const uploadResumeBtn = document.getElementById('upload-resume-btn');

        if (!jobsGrid) return;

        // Filter jobs
        function filterJobs() {
            const jobCards = jobsGrid.querySelectorAll('.job-card');
            const filters = {
                location: locationFilter?.value || '',
                skill: skillFilter?.value || '',
                visa: visaFilter?.value || '',
                salaryMin: parseInt(salaryMin?.value) || 0,
                salaryMax: parseInt(salaryMax?.value) || Infinity
            };

            jobCards.forEach(card => {
                const location = card.dataset.location || '';
                const skill = card.dataset.skill || '';
                const visa = card.dataset.visa || '';
                const salary = parseInt(card.dataset.salary) || 0;

                const matches = 
                    (filters.location === '' || location.includes(filters.location)) &&
                    (filters.skill === '' || skill.includes(filters.skill)) &&
                    (filters.visa === '' || visa.includes(filters.visa)) &&
                    salary >= filters.salaryMin &&
                    salary <= filters.salaryMax;

                card.style.display = matches ? 'block' : 'none';
            });
        }

        // Add filter event listeners
        [locationFilter, skillFilter, visaFilter, salaryMin, salaryMax].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', filterJobs);
                filter.addEventListener('input', filterJobs);
            }
        });

        // Job application handling
        const applyButtons = document.querySelectorAll('.btn-apply');
        applyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const jobId = btn.dataset.job;
                handleJobApplication(jobId);
            });
        });

        // Save job functionality
        const saveButtons = document.querySelectorAll('.btn-save');
        saveButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const jobCard = btn.closest('.job-card');
                toggleSaveJob(jobCard, btn);
            });
        });

        // Resume upload
        if (uploadResumeBtn) {
            uploadResumeBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx';
                input.addEventListener('change', handleResumeUpload);
                input.click();
            });
        }
    }

    // Handle job application
    function handleJobApplication(jobId) {
        const jobCard = document.querySelector(`[data-job="${jobId}"]`).closest('.job-card');
        const jobTitle = jobCard.querySelector('.job-title').textContent;
        const companyName = jobCard.querySelector('.company-name').textContent;
        
        const modal = createApplicationModal(jobTitle, companyName, jobId);
        document.body.appendChild(modal);
    }

    // Create comprehensive application modal
    function createApplicationModal(jobTitle, companyName, jobId) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay application-modal';
        modal.innerHTML = `
            <div class="modal-content application-modal-content">
                <div class="modal-header">
                    <div class="application-header-info">
                        <h3>Apply for ${jobTitle}</h3>
                        <p class="company-info">${companyName}</p>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="application-form" id="application-form-${jobId}">
                        <div class="form-section">
                            <h4><i class="fas fa-user"></i> Personal Information</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="fullName">Full Name *</label>
                                    <input type="text" id="fullName" name="fullName" required>
                                </div>
                            </div>
                                                         <div class="form-row two-columns">
                                 <div class="form-group">
                                     <label for="email">Email Address *</label>
                                     <input type="email" id="email" name="email" required>
                                 </div>
                                 <div class="form-group">
                                     <label for="phone">Phone Number *</label>
                                     <input type="tel" id="phone" name="phone" required>
                                 </div>
                             </div>
                        </div>

                        <div class="form-section">
                            <h4><i class="fas fa-file-upload"></i> Resume Upload</h4>
                            <div class="upload-container">
                                <div class="upload-area" id="upload-area-${jobId}">
                                    <div class="upload-icon">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <div class="upload-text">
                                        <p>Drag and drop your resume here</p>
                                        <span>or click to browse</span>
                                    </div>
                                    <input type="file" id="resume-upload-${jobId}" name="resume" accept=".pdf,.doc,.docx" required style="display: none;">
                                </div>
                                <div class="file-info" id="file-info-${jobId}" style="display: none;">
                                    <i class="fas fa-file-pdf"></i>
                                    <span class="file-name"></span>
                                    <span class="file-size"></span>
                                    <button type="button" class="remove-file" onclick="removeFile('${jobId}')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4><i class="fas fa-comment"></i> Additional Information</h4>
                            <div class="form-group">
                                <label for="coverLetter">Cover Letter / Message (Optional)</label>
                                <textarea id="coverLetter" name="coverLetter" rows="4" placeholder="Tell us why you're interested in this position..."></textarea>
                            </div>
                        </div>

                        <div class="application-consent">
                            <label class="checkbox-label">
                                <input type="checkbox" name="consent" required>
                                <span class="checkmark"></span>
                                I consent to CloudFlexIT processing my personal data for recruitment purposes
                            </label>
                        </div>

                        <div class="application-actions">
                            <button type="button" class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary btn-submit">
                                <i class="fas fa-paper-plane"></i>
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Set up file upload functionality
        setupFileUpload(modal, jobId);
        
        // Set up form submission
        setupFormSubmission(modal, jobId, jobTitle, companyName);

        return modal;
    }

    // Set up file upload functionality
    function setupFileUpload(modal, jobId) {
        const uploadArea = modal.querySelector(`#upload-area-${jobId}`);
        const fileInput = modal.querySelector(`#resume-upload-${jobId}`);
        const fileInfo = modal.querySelector(`#file-info-${jobId}`);

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0], jobId);
            }
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0], jobId);
            }
        });
    }

    // Handle file upload
    function handleFileUpload(file, jobId) {
        const uploadArea = document.querySelector(`#upload-area-${jobId}`);
        const fileInfo = document.querySelector(`#file-info-${jobId}`);
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            showNotification('Please upload a PDF or Word document', 'error');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size must be less than 5MB', 'error');
            return;
        }

        // Store file reference
        uploadArea.style.display = 'none';
        fileInfo.style.display = 'flex';
        fileInfo.querySelector('.file-name').textContent = file.name;
        fileInfo.querySelector('.file-size').textContent = formatFileSize(file.size);
        fileInfo.dataset.file = file.name;
    }

    // Remove uploaded file
    window.removeFile = function(jobId) {
        const uploadArea = document.querySelector(`#upload-area-${jobId}`);
        const fileInfo = document.querySelector(`#file-info-${jobId}`);
        const fileInput = document.querySelector(`#resume-upload-${jobId}`);
        
        uploadArea.style.display = 'flex';
        fileInfo.style.display = 'none';
        fileInput.value = '';
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Set up form submission
    function setupFormSubmission(modal, jobId, jobTitle, companyName) {
        const form = modal.querySelector(`#application-form-${jobId}`);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                formData.append('jobTitle', jobTitle);
                formData.append('companyName', companyName);
                formData.append('jobId', jobId);
                formData.append('applicationDate', new Date().toISOString());

                // Send application via EmailJS or your preferred service
                await sendApplicationEmail(formData);
                
                // Show success message
                modal.innerHTML = `
                    <div class="modal-content success-modal">
                        <div class="success-content">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Application Submitted Successfully!</h3>
                            <p>Thank you for applying to <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
                            <p>We'll review your application and get back to you within 24-48 hours.</p>
                            <div class="next-steps">
                                <h4>What's Next?</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Application review (24-48 hours)</li>
                                    <li><i class="fas fa-phone"></i> Initial screening call</li>
                                    <li><i class="fas fa-users"></i> Technical interview</li>
                                    <li><i class="fas fa-handshake"></i> Final decision</li>
                                </ul>
                            </div>
                            <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                                Close
                            </button>
                        </div>
                    </div>
                `;

            } catch (error) {
                console.error('Error submitting application:', error);
                showNotification('Failed to submit application. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Send application email
    async function sendApplicationEmail(formData) {
        // Create email content
        const emailContent = {
            to: 'manibusinesshub@gmail.com',
            subject: `Job Application: ${formData.get('jobTitle')} - ${formData.get('fullName')}`,
            body: `
                New Job Application Received
                
                Position: ${formData.get('jobTitle')}
                Company: ${formData.get('companyName')}
                
                Applicant Details:
                - Name: ${formData.get('fullName')}
                - Email: ${formData.get('email')}
                - Phone: ${formData.get('phone')}
                
                Cover Letter:
                ${formData.get('coverLetter') || 'No cover letter provided'}
                
                Resume: ${formData.get('resume')?.name || 'No resume uploaded'}
                
                Application Date: ${new Date().toLocaleString()}
            `
        };

        // In a real implementation, you would use a service like EmailJS, Formspree, or your own backend
        // For now, we'll simulate the email sending
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Email sent:', emailContent);
                resolve();
            }, 2000);
        });
    }

    // Toggle save job
    function toggleSaveJob(jobCard, btn) {
        const icon = btn.querySelector('i');
        const isSaved = icon.classList.contains('fas');
        
        if (isSaved) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.innerHTML = '<i class="far fa-bookmark"></i> Save';
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        }
    }

    // Handle resume upload
    function handleResumeUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const modal = createModal('Resume Upload', `
                <p><strong>File:</strong> ${file.name}</p>
                <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Your resume has been uploaded successfully! We'll match you with relevant opportunities.</p>
            `);
            
            document.body.appendChild(modal);
            setTimeout(() => modal.remove(), 4000);
        }
    }

    // Resources Section Functionality
    function initResourcesSection() {
        const resourceButtons = document.querySelectorAll('.resource-download');
        
        resourceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const resource = btn.dataset.resource;
                handleResourceDownload(resource, btn);
            });
        });
    }

    // Handle resource downloads
    function handleResourceDownload(resource, btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            // Simulate download or redirect
            const resourceActions = {
                'h1b-guide': () => {
                    createModal('H1B Guide', 'Your H1B Process Guide is being prepared. Check your email for the download link!');
                },
                'salary-report': () => {
                    window.open('#salary-calculator', '_blank');
                },
                'resume-templates': () => {
                    createModal('Resume Templates', 'Template pack is being prepared. Download will start shortly!');
                },
                'interview-questions': () => {
                    createModal('Interview Questions', 'Redirecting to our interview preparation portal...');
                },
                'salary-calculator': () => {
                    openSalaryCalculator();
                },
                'visa-tracker': () => {
                    openVisaTracker();
                }
            };

            if (resourceActions[resource]) {
                resourceActions[resource]();
            }

            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    // Language Selector
    function initLanguageSelector() {
        const languageSelect = document.getElementById('language-select');
        
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                // In a real implementation, this would trigger translation
                console.log(`Language changed to: ${selectedLang}`);
                
                // Save preference
                localStorage.setItem('preferred-language', selectedLang);
                
                // Show language change notification
                showNotification(`Language changed to ${getLanguageName(selectedLang)}`, 'success');
            });

            // Load saved language preference
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang) {
                languageSelect.value = savedLang;
            }
        }
    }

    // Get language name
    function getLanguageName(code) {
        const languages = {
            'en': 'English',
            'es': 'Español',
            'hi': 'हिंदी',
            'zh': '中文'
        };
        return languages[code] || 'English';
    }

    // Live Notifications
    function initLiveNotifications() {
        const notificationContainer = document.getElementById('live-notifications');
        if (!notificationContainer) return;

        const notifications = [
            "John D. just got placed at Microsoft with H1B sponsorship!",
            "Sarah P. received her Green Card approval through our program!",
            "Michael R. landed a $150K role at Google with our help!",
            "Priya S. successfully transitioned from QA to DevOps!",
            "Carlos M. got his H1B approved in record time!"
        ];

        let currentIndex = 0;

        function updateNotification() {
            const notificationItem = notificationContainer.querySelector('.notification-item span');
            if (notificationItem) {
                notificationItem.textContent = notifications[currentIndex];
                currentIndex = (currentIndex + 1) % notifications.length;
            }
        }

        // Update notification every 5 seconds
        setInterval(updateNotification, 5000);
    }

    // Case Studies Slider
    function initCaseStudiesSlider() {
        const slider = document.querySelector('.case-studies-slider');
        if (!slider) return;

        const cards = slider.querySelectorAll('.case-study-card');
        let currentSlide = 0;

        function showSlide(index) {
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        }

        // Auto-advance slides
        setInterval(nextSlide, 8000);

        // Manual navigation (if navigation buttons exist)
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + cards.length) % cards.length;
                showSlide(currentSlide);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
    }

    // PWA Functionality
    function initPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }

        // Install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstallPrompt();
        });

        function showInstallPrompt() {
            const installBanner = document.createElement('div');
            installBanner.className = 'install-banner';
            installBanner.innerHTML = `
                <div class="install-content">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Install CloudFlexIT app for a better experience!</span>
                    <button class="btn btn-primary btn-sm" id="install-btn">Install</button>
                    <button class="btn btn-outline btn-sm" id="dismiss-btn">Dismiss</button>
                </div>
            `;

            document.body.appendChild(installBanner);

            // Handle install
            document.getElementById('install-btn').addEventListener('click', () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        deferredPrompt = null;
                        installBanner.remove();
                    });
                }
            });

            // Handle dismiss
            document.getElementById('dismiss-btn').addEventListener('click', () => {
                installBanner.remove();
            });
        }
    }

    // Utility Functions
    function createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        return modal;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => notification.remove(), 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    function openSalaryCalculator() {
        const calculator = createModal('Salary Calculator', `
            <div class="calculator-form">
                <div class="form-group">
                    <label>Experience Level:</label>
                    <select id="exp-level">
                        <option value="junior">Junior (0-2 years)</option>
                        <option value="mid">Mid-level (3-5 years)</option>
                        <option value="senior">Senior (6-10 years)</option>
                        <option value="lead">Lead (10+ years)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Primary Skill:</label>
                    <select id="primary-skill">
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="react">React</option>
                        <option value="aws">AWS</option>
                        <option value="devops">DevOps</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Location:</label>
                    <select id="location">
                        <option value="ny">New York</option>
                        <option value="ca">California</option>
                        <option value="tx">Texas</option>
                        <option value="remote">Remote</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="calculateSalary()">Calculate Salary</button>
                <div id="salary-result" style="margin-top: 20px;"></div>
            </div>
        `);

        document.body.appendChild(calculator);

        // Add calculate function to window for onclick
        window.calculateSalary = function() {
            const baseRanges = {
                junior: [70000, 90000],
                mid: [90000, 120000],
                senior: [120000, 160000],
                lead: [160000, 200000]
            };

            const skillMultipliers = {
                java: 1.0,
                python: 1.1,
                react: 1.05,
                aws: 1.15,
                devops: 1.2
            };

            const locationMultipliers = {
                ny: 1.3,
                ca: 1.4,
                tx: 1.1,
                remote: 1.0
            };

            const exp = document.getElementById('exp-level').value;
            const skill = document.getElementById('primary-skill').value;
            const location = document.getElementById('location').value;

            const baseRange = baseRanges[exp];
            const skillMult = skillMultipliers[skill];
            const locationMult = locationMultipliers[location];

            const minSalary = Math.round(baseRange[0] * skillMult * locationMult);
            const maxSalary = Math.round(baseRange[1] * skillMult * locationMult);

            document.getElementById('salary-result').innerHTML = `
                <div class="salary-result">
                    <h4>Estimated Salary Range:</h4>
                    <div class="salary-range">
                        $${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}
                    </div>
                    <p><small>*Estimates based on current market data</small></p>
                </div>
            `;
        };
    }

    function openVisaTracker() {
        const tracker = createModal('Visa Timeline Tracker', `
            <div class="visa-tracker">
                <div class="tracker-steps">
                    <div class="step completed">
                        <div class="step-icon"><i class="fas fa-check"></i></div>
                        <div class="step-content">
                            <h4>Application Submitted</h4>
                            <p>December 1, 2024</p>
                        </div>
                    </div>
                    <div class="step completed">
                        <div class="step-icon"><i class="fas fa-check"></i></div>
                        <div class="step-content">
                            <h4>Initial Review</h4>
                            <p>December 15, 2024</p>
                        </div>
                    </div>
                    <div class="step active">
                        <div class="step-icon"><i class="fas fa-clock"></i></div>
                        <div class="step-content">
                            <h4>Background Check</h4>
                            <p>In Progress</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-icon"><i class="fas fa-calendar"></i></div>
                        <div class="step-content">
                            <h4>Interview Scheduled</h4>
                            <p>Pending</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-icon"><i class="fas fa-award"></i></div>
                        <div class="step-content">
                            <h4>Approval</h4>
                            <p>Pending</p>
                        </div>
                    </div>
                </div>
                <div class="tracker-info">
                    <p><strong>Estimated Timeline:</strong> 3-6 months</p>
                    <p><strong>Next Step:</strong> Background verification completion</p>
                </div>
            </div>
        `);

                 document.body.appendChild(tracker);
     }

    // Immigration Bot Action Functions
        window.open('mailto:business@cloudflexit.com?subject=Consulting Quote Request', '_blank');
    };

    // Initialize with welcome message
    setTimeout(() => {
        addMessage(generateGreetingResponse(), 'ai');
    }, 1000);

    return {
        addMessage,
        generateAIResponse,
        handleCapabilitySelection,
        handleQuickAction
    };
})();