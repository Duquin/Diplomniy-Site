// Простой скрипт
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Эффект печатающегося текста
    const textElement = document.getElementById('typedText');
    const texts = [
        "создаю дипломный сайт...",
        "пишу код на JavaScript...",
        "работаю с графикой...",
        "готовлю проект к защите!"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    
    function typeText() {
        const text = texts[textIndex];
        
        if (deleting) {
            textElement.textContent = text.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = 100;
        
        if (deleting) speed = 50;
        
        if (!deleting && charIndex === text.length) {
            speed = 2000;
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
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
        document.body.classList.toggle('light');
        icon.className = document.body.classList.contains('light') ? 
            'fas fa-moon' : 'fas fa-sun';
    });
    
    // 3. Плавный скролл для ссылок в шапке
    document.querySelectorAll('.tech-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // 4. Подтверждение внешних ссылок
    document.querySelectorAll('.link-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.target === '_blank') {
                const name = this.querySelector('span').textContent;
                if (!confirm(`Открыть ${name}?`)) {
                    e.preventDefault();
                }
            }
        });
    });
    
    console.log('Сайт готов!');
});
