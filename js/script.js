document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    let isManuallyToggled = false; // Para controlar si se ha presionado el botón
    const menuContainer = document.getElementById('menu-container');
    const toggleButton = document.getElementById('toggle-menu');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!isManuallyToggled && scrollTop > lastScrollTop && scrollTop > 100) {
            menuContainer.classList.add('collapsed');
        } else if (!isManuallyToggled && scrollTop < lastScrollTop) {
            menuContainer.classList.remove('collapsed');
        }
        lastScrollTop = scrollTop;
    });

    toggleButton.addEventListener('click', function () {
        isManuallyToggled = !isManuallyToggled;
        menuContainer.classList.toggle('collapsed');
    });
});
