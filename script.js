// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Обновление активной ссылки
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Анимация элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Для карточек проектов добавляем задержку
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
                
                // Для элементов навыков
                if (entry.target.classList.contains('skill-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .section-header, .skills-card');
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const visualContainer = document.querySelector('.visual-container');
        
        if (hero && visualContainer) {
            const rate = scrolled * -0.5;
            visualContainer.style.transform = `translateY(${rate}px)`;
        }
        
        // Изменение навигации при скролле
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        // Активная секция в навигации
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Анимация при наведении на карточки проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Анимация счетчиков в герое
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }
    
    // Запуск счетчиков при загрузке
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            animateCounter(stat, target);
        }
    });
    
    // Копирование кода из окна кода
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeWindow.addEventListener('click', function() {
            const codeContent = document.querySelector('.window-content code').textContent;
            navigator.clipboard.writeText(codeContent).then(() => {
                const originalTitle = this.querySelector('.window-title').textContent;
                this.querySelector('.window-title').textContent = 'Скопировано!';
                
                setTimeout(() => {
                    this.querySelector('.window-title').textContent = originalTitle;
                }, 2000);
            });
        });
    }
});
