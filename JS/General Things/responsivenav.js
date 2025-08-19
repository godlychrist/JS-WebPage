document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.navigation');
    const responsiveNav = document.querySelector('.responsive-nav');
    const navLinks = responsiveNav.querySelectorAll('a');

    // Mostrar la nav responsive
    navToggle.addEventListener('click', function () {
        responsiveNav.classList.add('active');
        navToggle.classList.add('hide');
    });

    // Ocultar nav cada vez que se hace clic en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            responsiveNav.classList.remove('active');
            navToggle.classList.remove('hide');
        });
    });
});
