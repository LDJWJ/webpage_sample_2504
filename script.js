// Common JavaScript for NEOGYM website

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.padding = '15px 0';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.9)';
        header.style.padding = '20px 0';
    }
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Slider dots functionality
    const dots = document.querySelectorAll('.slider-dot');
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                // Here you would add actual slider functionality
                // This is just a placeholder for demo purposes
            });
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        headerContent.appendChild(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? 
                            '<i class="fas fa-times"></i>' : 
                            '<i class="fas fa-bars"></i>';
        });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would usually send the form data to a server
                // For demo purposes, we'll just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-success-message';
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(formMessage);
            }
        });
    }

    // Testimonial slider auto-play
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    if (testimonialItems.length > 1) {
        setInterval(() => {
            testimonialItems[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            testimonialItems[currentTestimonial].style.opacity = '1';
            
            // Update dots if they exist
            const testDots = document.querySelectorAll('.testimonials-slider .slider-dot');
            if (testDots.length > 0) {
                testDots.forEach(d => d.classList.remove('active'));
                testDots[currentTestimonial].classList.add('active');
            }
        }, 5000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .trainer-card, .testimonial-item, .stat-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }
});

// Additional CSS for mobile menu in JavaScript to avoid modifying the CSS file
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                background: rgba(20, 20, 20, 0.95);
                flex-direction: column;
                padding: 20px 0;
                text-align: center;
                transition: 0.3s;
                backdrop-filter: blur(10px);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu a {
                margin: 10px 0;
                display: block;
            }
            
            .mobile-menu-toggle {
                display: block;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
            }

            .form-success-message {
                text-align: center;
                padding: 20px;
                color: #28a745;
                font-weight: 500;
            }

            .error {
                border: 1px solid #dc3545 !important;
            }

            .animated {
                animation: fadeIn 0.5s ease-in-out forwards;
            }

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    </style>
`);