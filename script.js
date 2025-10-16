// ====================================
// 1. MENU HAMBURGER RESPONSIVO
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Função para alternar o menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        // Opcional: Animar o ícone hamburger
        hamburger.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (mobile)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});


// ====================================
// 2. EFEITO REVEAL ON SCROLL (APENAS NOS CARTÕES)
// ====================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Inicia quando 15% do elemento é visível
};

const productObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe 'active' para iniciar a animação CSS
            entry.target.classList.add('active');
            // Remove a observação após a primeira aparição (melhora a performance)
            productObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleciona APENAS os cartões de produto
const revealElements = document.querySelectorAll('.produto-card.reveal-item');

revealElements.forEach(element => {
    productObserver.observe(element);
});