document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    let isManuallyToggled = false; // Para controlar si se ha presionado el botón
    const menuContainer = document.getElementById('menu-container');
    const toggleButton = document.getElementById('toggle-menu');

    // Detectar el scroll
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Si no se ha ocultado manualmente y el scroll es hacia abajo, ocultamos el menú
        if (!isManuallyToggled && scrollTop > lastScrollTop && scrollTop > 100) {
            menuContainer.classList.add('collapsed'); // Ocultar menú
            toggleButton.style.transform = 'translateY(-50%) rotate(-90deg)'; // Rotar flecha a la izquierda
        } 
        // Si el scroll es hacia arriba, mostramos el menú
        else if (!isManuallyToggled && scrollTop < lastScrollTop) {
            menuContainer.classList.remove('collapsed'); // Mostrar menú
            toggleButton.style.transform = 'translateY(-50%) rotate(90deg)'; // Rotar flecha a la derecha
        }

        // Si no está en la parte superior, añadir fondo opaco al menú
        if (scrollTop > 100) {
            menuContainer.classList.add('menu-background');
        } else {
            menuContainer.classList.remove('menu-background');
        }

        lastScrollTop = scrollTop;
    });

    // Función para alternar el menú cuando el botón de la flecha se presiona
    toggleButton.addEventListener('click', function () {
        isManuallyToggled = !isManuallyToggled; // Cambia el estado manual

        if (menuContainer.classList.contains('collapsed')) {
            menuContainer.classList.remove('collapsed');
            toggleButton.style.transform = 'translateY(-50%) rotate(90deg)'; // Flecha a la derecha
        } else {
            menuContainer.classList.add('collapsed');
            toggleButton.style.transform = 'translateY(-50%) rotate(-90deg)'; // Flecha a la izquierda
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.querySelector('#scrolltop-button a').addEventListener('click', function (e) {
    e.preventDefault(); // Evita el cambio de enlace
    window.scrollBy({
        top: -window.innerHeight, // Sube una altura de pantalla
        behavior: 'smooth', // Transición suave
    });
});
