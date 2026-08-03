// ============================================
// MAIN JAVASCRIPT - FIXED VERSION
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVBAR TOGGLE WITH OVERLAY =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        if (hamburger && navMenu && navOverlay) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // ===== TYPING EFFECT =====
    class Typewriter {
        constructor(element, words, speed, delay) {
            this.element = element;
            this.words = words;
            this.speed = speed || 100;
            this.delay = delay || 2000;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.type();
        }

        type() {
            const currentWord = this.words[this.wordIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentWord.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentWord.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.speed;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.charIndex === currentWord.length) {
                typeSpeed = this.delay;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
                typeSpeed = 500;
            }

            setTimeout(this.type.bind(this), typeSpeed);
        }
    }

    // Initialize typewriter (kata-katanya bisa datang dari data dinamis di render-home.js)
    const typewriterElement = document.getElementById('typewriter');
    function startTypewriter() {
        if (typewriterElement && !typewriterElement.dataset.started) {
            typewriterElement.dataset.started = 'true';
            const words = (window.TYPEWRITER_WORDS && window.TYPEWRITER_WORDS.length)
                ? window.TYPEWRITER_WORDS
                : ['Data Analyst', 'Internet of Things', 'Freelancer'];
            new Typewriter(typewriterElement, words, 100, 2000);
        }
    }
    if (typewriterElement) {
        if (window.TYPEWRITER_WORDS) {
            startTypewriter();
        } else {
            document.addEventListener('typewriter:ready', startTypewriter);
            setTimeout(startTypewriter, 1000);
        }
    }

    // ===== SKILL BAR ANIMATION =====
    // Skill bar dirender dinamis (lihat render-home.js), jadi query ulang tiap kali dibutuhkan
    const animateSkillBars = function() {
        document.querySelectorAll('.skill-progress').forEach(function(bar) {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.dataset.animated) {
                bar.dataset.animated = 'true';
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(function() {
                    bar.style.width = width;
                }, 200);
            }
        });
    };

    document.addEventListener('content:rendered', function() {
        setTimeout(animateSkillBars, 300);
    });

    window.addEventListener('load', function() {
        setTimeout(animateSkillBars, 500);
    });

    window.addEventListener('scroll', animateSkillBars);

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const createBackToTop = function() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #6C63FF;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(108, 99, 255, 0.4);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 999;
        `;
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', function() {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 8px 25px rgba(108, 99, 255, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 15px rgba(108, 99, 255, 0.4)';
        });
    };

    createBackToTop();

    // ===== THEME TOGGLE (DARK MODE) =====
    // Class 'dark-mode' sudah di-set lebih awal oleh inline script di <body>
    // (mencegah kedip). Di sini kita cuma sinkronkan ikon & pasang klik.
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ===== SCROLL REVEAL =====
    // Elemen dengan class "reveal" (dibuat statis di HTML atau dinamis
    // lewat render-*.js) akan muncul halus saat masuk viewport.
    function initRevealObserver() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el));
    }

    initRevealObserver();
    document.addEventListener('content:rendered', initRevealObserver);

    console.log('✅ Main.js loaded successfully!');

});