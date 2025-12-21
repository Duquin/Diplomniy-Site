// Основной скрипт для дипломного сайта[citation:9]

document.addEventListener('DOMContentLoaded', function() {
    // 1. Эффект печатающегося текста в терминале
    const typedCommand = document.getElementById('typed-command');
    const commands = [
        "запуск дипломного_сайта.exe",
        "инициализация графического_движка",
        "компиляция WebGL_компонентов",
        "подключение к GitHub_API",
        "готово к защите диплома"
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            // Удаление текста
            typedCommand.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Печать текста
            typedCommand.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Проверка завершения команды
        if (!isDeleting && charIndex === currentCommand.length) {
            // Пауза перед удалением
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Переход к следующей команде
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Запуск эффекта печати с задержкой
    setTimeout(typeText, 1000);
    
    // 2. Создание эффекта матрицы на фоне
    function createMatrixEffect() {
        const matrixContainer = document.getElementById('matrix');
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        
        // Создаем колонки с падающими символами
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.top = '-100px';
            column.style.left = i * fontSize + 'px';
            column.style.color = '#00ff00';
            column.style.fontSize = fontSize + 'px';
            column.style.fontFamily = 'Share Tech Mono, monospace';
            column.style.opacity = Math.random() * 0.5 + 0.1;
            column.style.textShadow = '0 0 5px #00ff00';
            column.style.zIndex = '1';
            matrixContainer.appendChild(column);
            
            // Анимация падающих символов
            animateColumn(column);
        }
    }
    
    function animateColumn(column) {
        let position = -100;
        const speed = Math.random() * 5 + 2;
        const length = Math.floor(Math.random() * 15) + 5;
        let charsArray = [];
        
        // Создаем начальный набор символов
        for (let i = 0; i < length; i++) {
            charsArray.push(getRandomChar());
        }
        
        function move() {
            position += speed;
            
            // Обновляем символы
            if (Math.random() > 0.97) {
                charsArray[0] = getRandomChar();
            }
            
            // Сдвигаем символы вниз
            for (let i = charsArray.length - 1; i > 0; i--) {
                if (Math.random() > 0.95) {
                    charsArray[i] = charsArray[i-1];
                }
            }
            
            // Отображаем колонку
            column.style.top = position + 'px';
            column.textContent = charsArray.join('\n');
            
            // Если колонка ушла за экран, сбрасываем ее вверх
            if (position > window.innerHeight) {
                position = -100;
                charsArray = [];
                for (let i = 0; i < length; i++) {
                    charsArray.push(getRandomChar());
                }
            }
            
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    function getRandomChar() {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        return chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Запускаем эффект матрицы
    createMatrixEffect();
    
    // 3. Расчет дней до защиты диплома
    function updateDaysUntilDefense() {
        const defenseDate = new Date('2025-06-15'); // Укажите свою дату защиты
        const today = new Date();
        const timeDiff = defenseDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        const daysElement = document.getElementById('days-left');
        if (daysLeft > 0) {
            daysElement.textContent = daysLeft;
            daysElement.style.color = daysLeft < 30 ? '#ff6600' : '#00ff00';
        } else if (daysLeft === 0) {
            daysElement.textContent = '0';
            daysElement.style.color = '#ff0000';
        } else {
            daysElement.textContent = 'Защита прошла';
            daysElement.style.color = '#888';
        }
    }
    
    updateDaysUntilDefense();
    
    // 4. Анимация счетчика проектов
    function animateCounter(elementId, targetValue, duration = 2000) {
        const element = document.getElementById(elementId);
        const startValue = 0;
        const startTime = Date.now();
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Используем ease-out функцию для плавности
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * targetValue);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue;
            }
        }
        
        updateCounter();
    }
    
    // Запускаем анимацию счетчика проектов (предположим, что у вас 12 проектов)
    setTimeout(() => animateCounter('projects-count', 12), 1500);
    
    // 5. Добавление случайных сообщений в терминальный вывод
    function addTerminalMessage() {
        const terminal = document.getElementById('terminal-output');
        const messages = [
            "> Проверка целостности данных... Успешно",
            "> Подключение к серверу дипломной комиссии...",
            "> Загрузка графических ресурсов... 100%",
            "> Система готова к презентации",
            "> Анализ кода дипломной работы... Без ошибок",
            "> Подготовка документации... Завершено"
        ];
        
        let messageIndex = 0;
        
        function addMessage() {
            if (messageIndex < messages.length) {
                const newMessage = document.createElement('div');
                newMessage.textContent = messages[messageIndex];
                terminal.appendChild(newMessage);
                terminal.scrollTop = terminal.scrollHeight;
                messageIndex++;
                
                // Случайная задержка перед следующим сообщением
                const delay = Math.random() * 3000 + 2000;
                setTimeout(addMessage, delay);
            }
        }
        
        // Начинаем добавлять сообщения через 3 секунды
        setTimeout(addMessage, 3000);
    }
    
    addTerminalMessage();
    
    // 6. Эффект при наведении на карточки ссылок
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // 7. Обновление времени каждый день для счетчика дней
    setInterval(updateDaysUntilDefense, 24 * 60 * 60 * 1000); // Каждые 24 часа
});
