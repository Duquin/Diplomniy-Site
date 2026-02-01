document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Функция переключения меню
    burger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Закрываем меню при клике на любую ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
});
