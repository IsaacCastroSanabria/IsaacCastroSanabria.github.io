document.addEventListener('DOMContentLoaded', function () {
    // Variables existentes
    let lastScrollTop = 0;
    let isManuallyToggled = false; // Para controlar si se ha presionado el botón
    const menuContainer = document.getElementById('menu-container');
    const toggleButton = document.getElementById('toggle-menu');
    const sections = document.querySelectorAll('.content-section');

    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('contactModal');

    var check = document.querySelector(".check");
    
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

    setInterval(() => {
        moveToRight()
    }, 6000);

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

    // Evento para abrir el modal
    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // Evento para cerrar el modal
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cerrar el modal haciendo clic fuera del contenido
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const currentPath = window.location.pathname;

    // Configura el estado del switch según el archivo actual
    if (currentPath.includes('indexIngles.html')) {
        check.checked = true; // Si estás en la versión en inglés, activa el switch
    } else {
        check.checked = false; // Si estás en la versión en español, desactiva el switch
    }

    // Cambia entre idiomas al interactuar con el switch
    check.addEventListener('click', function () {
        if (check.checked) {
            location.href = 'indexIngles.html'; // Cambia a la versión en inglés
        } else {
            location.href = 'index.html'; // Cambia a la versión en español
        }
    });

});
