// Минимальный скрипт для сайта

document.addEventListener('DOMContentLoaded', function() {
    // 1. Эффект печатающегося текста
    const textElement = document.getElementById('typedText');
    const texts = [
        "запускаю дипломный сайт...",
        "подключаю GitHub...", 
        "готовлю 3D проект...",
        "все системы работают!"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = 100;
        
        if (isDeleting) {
            speed = 50;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        
        setTimeout(typeText, speed);
    }
    
    setTimeout(typeText, 1000);
    
    // 2. Переключение темы
    const themeBtn = document.getElementById('themeBtn');
    const icon = themeBtn.querySelector('i');
    
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    // 3. Навигация по кнопкам
    const navButtons = document.querySelectorAll('.nav-btn[data-target]');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 4. Простой эффект при наведении на ссылки
    const links = document.querySelectorAll('.link-btn');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Добавляем подтверждение при клике
        link.addEventListener('click', function(e) {
            const linkName = this.querySelector('h3').textContent;
            if (!confirm(`Перейти в ${linkName}?`)) {
                e.preventDefault();
            }
        });
    });
    
    console.log('Сайт загружен! Удачи с дипломом!');
});
