/* ==========================================
   PORTFOLIO - JavaScript
   All interactive functionality
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500);
    });
    // Fallback: remove preloader after 3s max
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 3000);

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active nav link highlighting
        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on load

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== ACTIVE NAV LINK HIGHLIGHTING ====================

    function updateActiveNavLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==================== SMOOTH SCROLLING ====================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }

            // Close offcanvas menu on mobile
            const offcanvas = document.getElementById('navMenu');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });

    // ==================== TYPING EFFECT ====================
    const typingElement = document.getElementById('typingText');
    const titles = [
        'Full Stack Developer',
        'Mobile App Developer',
        'Machine Learning Enthusiast',
        'Game Developer',
        'Creative Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==================== SKILL BARS ANIMATION ====================
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ==================== PORTFOLIO FILTERING ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                    item.style.position = 'relative';
                    item.style.display = '';
                } else {
                    item.classList.remove('show');
                    item.classList.add('hidden');
                    // Wait for animation then hide
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });

    // ==================== CONTACT FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset validation
        contactForm.classList.remove('was-validated');

        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const subject = document.getElementById('contactSubject');
        const message = document.getElementById('contactMessage');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        let isValid = true;

        // Validate name
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

        // Validate subject
        if (!subject.value.trim()) {
            subject.classList.add('is-invalid');
            isValid = false;
        } else {
            subject.classList.remove('is-invalid');
            subject.classList.add('is-valid');
        }

        // Validate message
        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.remove('is-invalid');
            message.classList.add('is-valid');
        }

        if (isValid) {
            // Show loading state
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                submitBtn.disabled = false;

                // Show success message
                formAlert.className = 'mt-3 alert alert-success';
                formAlert.innerHTML = '<i class="fa-solid fa-check-circle me-2"></i>Message sent successfully! I\'ll get back to you soon.';
                formAlert.classList.remove('d-none');

                // Reset form
                contactForm.reset();
                contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

                // Hide alert after 5s
                setTimeout(() => {
                    formAlert.classList.add('d-none');
                }, 5000);
            }, 1500);
        }
    });

    // Remove invalid class on input
    contactForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });
    });

    // ==================== 3D TILT EFFECT ====================
    function initTilt3D(element, options = {}) {
        const {
            maxTilt = 12,
            perspective = 1000,
            speed = 400,
            scale = 1.03,
            glare = true
        } = options;

        // Create shine overlay if glare enabled and not already present
        if (glare && !element.querySelector('.tilt-shine')) {
            const shine = document.createElement('div');
            shine.classList.add('tilt-shine');
            element.appendChild(shine);
        }

        function handleMouseMove(e) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);

            const rotateX = -percentY * maxTilt;
            const rotateY = percentX * maxTilt;

            element.style.transition = 'transform 0.1s ease-out';
            element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

            if (glare) {
                const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
                const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
                element.style.setProperty('--mouse-x', mouseXPercent + '%');
                element.style.setProperty('--mouse-y', mouseYPercent + '%');
            }
        }

        function handleMouseLeave() {
            element.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
    }

    // Only enable tilt on non-touch / wider screens
    if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
        // Service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.add('tilt-3d');
            initTilt3D(card, { maxTilt: 10, scale: 1.02 });
        });

        // Project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('tilt-3d');
            initTilt3D(card, { maxTilt: 8, scale: 1.02 });
        });

        // Stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            card.classList.add('tilt-3d');
            initTilt3D(card, { maxTilt: 15, scale: 1.05, perspective: 800 });
        });

        // Tool cards
        document.querySelectorAll('.tool-card').forEach(card => {
            card.classList.add('tilt-3d');
            initTilt3D(card, { maxTilt: 20, scale: 1.08, perspective: 600 });
        });

        // Testimonial card
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.classList.add('tilt-3d');
            initTilt3D(card, { maxTilt: 6, scale: 1.01, perspective: 1200 });
        });

        // Contact form
        const contactFormEl = document.querySelector('.contact-form');
        if (contactFormEl) {
            contactFormEl.classList.add('tilt-3d');
            initTilt3D(contactFormEl, { maxTilt: 4, scale: 1.0, perspective: 1500 });
        }
    }

    // ==================== 3D HERO PARALLAX (Mouse Movement) ====================
    const heroSection = document.getElementById('hero');
    if (heroSection && window.matchMedia('(hover: hover)').matches) {
        const heroContent = heroSection.querySelector('.col-lg-8');
        const heroImage = heroSection.querySelector('.hero-image-wrapper');
        const floatingShapes = heroSection.querySelectorAll('.floating-shape');

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            // Move hero content slightly opposite to mouse (subtle)
            if (heroContent) {
                heroContent.style.transition = 'transform 0.15s ease-out';
                heroContent.style.transform = `translate3d(${mouseX * -15}px, ${mouseY * -10}px, 0)`;
            }

            // Move hero image more dramatically toward mouse
            if (heroImage) {
                heroImage.style.animation = 'none';
                heroImage.style.transition = 'transform 0.15s ease-out';
                heroImage.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg) translateZ(20px)`;
            }

            // Move floating shapes at different speeds for depth
            floatingShapes.forEach((shape, i) => {
                const depth = (i + 1) * 8;
                shape.style.transition = 'transform 0.2s ease-out';
                shape.style.transform = `translate3d(${mouseX * depth}px, ${mouseY * depth}px, ${-40 - i * 20}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroContent) {
                heroContent.style.transition = 'transform 0.5s ease';
                heroContent.style.transform = 'translate3d(0, 0, 0)';
            }
            if (heroImage) {
                heroImage.style.transition = 'transform 0.5s ease';
                heroImage.style.transform = 'perspective(1000px) translateZ(0) rotateX(0) rotateY(0)';
                // Restart float animation after delay
                setTimeout(() => { heroImage.style.animation = ''; }, 500);
            }
            floatingShapes.forEach((shape, i) => {
                shape.style.transition = 'transform 0.8s ease';
                shape.style.transform = '';
            });
        });
    }

    // ==================== 3D SCROLL REVEAL ====================
    const reveal3dElements = document.querySelectorAll('.reveal-3d, .reveal-3d-left, .reveal-3d-right');
    const reveal3dObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    reveal3dElements.forEach(el => reveal3dObserver.observe(el));

    // ==================== TOUCH SUPPORT FOR PROJECT CARDS ====================
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // If card already has touch-active, let the click through (second tap)
                if (card.classList.contains('touch-active')) {
                    return;
                }

                // First tap: show overlay, prevent default action
                e.preventDefault();
                e.stopPropagation();

                // Remove touch-active from all other cards
                projectCards.forEach(c => c.classList.remove('touch-active'));

                // Add touch-active to this card
                card.classList.add('touch-active');
            });
        });

        // Tap outside to dismiss overlay
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.project-card')) {
                document.querySelectorAll('.project-card.touch-active').forEach(c => {
                    c.classList.remove('touch-active');
                });
            }
        });
    }

    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-bs-theme', newTheme);
        document.body.classList.toggle('light-mode', newTheme === 'light');
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Apply saved theme class on load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

});
