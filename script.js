// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Анимация гамбургера
            if (navMenu.classList.contains('active')) {
                hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                hamburger.querySelectorAll('span')[1].style.opacity = '0';
                hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                hamburger.querySelectorAll('span')[0].style.transform = 'none';
                hamburger.querySelectorAll('span')[1].style.opacity = '1';
                hamburger.querySelectorAll('span')[2].style.transform = 'none';
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.querySelectorAll('span')[0].style.transform = 'none';
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
            hamburger.querySelectorAll('span')[2].style.transform = 'none';
            
            // Обновление активной ссылки
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем проекты
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
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
                
                // Для счетчиков
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Для progress bars
                if (entry.target.classList.contains('level-fill')) {
                    entry.target.style.width = entry.target.style.width;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.project-card, .skill-card, .section-header, .skills-quote, .stat-number, .level-fill');
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        const visualContainer = document.querySelector('.floating-card');
        
        // Изменение навигации при скролле
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Легкий параллакс для карточки
        if (visualContainer) {
            const rate = scrolled * -0.2;
            visualContainer.style.transform = `translateY(${rate}px)`;
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
    
    // Анимация счетчиков
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }
    
    // Запуск счетчиков при загрузке (если они уже видны)
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (isElementInViewport(stat)) {
            animateCounter(stat);
        }
    });
    
    // Вспомогательная функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Копирование кода из окна кода
    const codeWindow = document.querySelector('.floating-card');
    if (codeWindow) {
        codeWindow.addEventListener('click', function(e) {
            // Проверяем, что клик был не по ссылке внутри
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            const codeContent = document.querySelector('.card-content code').textContent;
            navigator.clipboard.writeText(codeContent).then(() => {
                const originalTitle = this.querySelector('.card-title').textContent;
                this.querySelector('.card-title').textContent = 'Скопировано!';
                
                setTimeout(() => {
                    this.querySelector('.card-title').textContent = originalTitle;
                }, 2000);
            });
        });
    }
    
    // Анимация при наведении на карточки проектов
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Инициализация всех счетчиков при загрузке
    setTimeout(() => {
        statNumbers.forEach(stat => {
            if (!stat.hasAttribute('data-animated')) {
                const target = parseInt(stat.getAttribute('data-count'));
                if (!isNaN(target) && target > 0) {
                    stat.setAttribute('data-animated', 'true');
                    animateCounter(stat);
                }
            }
        });
    }, 1000);
});
