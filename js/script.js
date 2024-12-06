document.addEventListener('DOMContentLoaded', function () {
    // Variables existentes
    let lastScrollTop = 0;
    let isManuallyToggled = false; // Para controlar si se ha presionado el botón
    const menuContainer = document.getElementById('menu-container');
    const toggleButton = document.getElementById('toggle-menu');
    const sections = document.querySelectorAll('.content-section');

    // Nuevas variables para el slider
    const btnLeft = document.querySelector(".btn-left"),
          btnRight = document.querySelector(".btn-right"),
          slider = document.querySelector("#slider"),
          sliderSection = document.querySelectorAll(".slider-section");
    
    // Detectar el scroll
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (!isManuallyToggled && scrollTop > lastScrollTop && scrollTop > 100) {
            menuContainer.classList.add('collapsed'); // Ocultar menú
            toggleButton.style.transform = 'translateY(-50%) rotate(-90deg)'; // Rotar flecha a la izquierda
        } else if (!isManuallyToggled && scrollTop < lastScrollTop) {
            menuContainer.classList.remove('collapsed'); // Mostrar menú
            toggleButton.style.transform = 'translateY(-50%) rotate(90deg)'; // Rotar flecha a la derecha
        }

        if (scrollTop > 100) {
            menuContainer.classList.add('menu-background');
        } else {
            menuContainer.classList.remove('menu-background');
        }

        lastScrollTop = scrollTop;
    });

    // Observador de secciones
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

    // Controladores del slider
    btnLeft.addEventListener("click", e => moveToLeft());
    btnRight.addEventListener("click", e => moveToRight());



    // Lógica del slider
    let operacion = 0,
        counter = 0,
        widthImg = 50 / sliderSection.length;

    function moveToRight() {
        if (counter >= sliderSection.length - 1) {
            counter = 0;
            operacion = 0;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        }
        counter++;
        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }

    function moveToLeft() {
        counter--;
        if (counter < 0) {
            counter = sliderSection.length - 1;
            operacion = widthImg * (sliderSection.length - 1);
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        }
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }
});
