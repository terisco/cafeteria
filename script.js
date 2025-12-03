document.addEventListener('DOMContentLoaded', () => {

    /* ==================================== */
    /* 1. MENU HAMBURGER RESPONSIVO */
    /* ==================================== */
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Fecha o menu ao clicar em qualquer link (mobile)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==================================== */
    /* 2. EFEITO REVEAL ON SCROLL */
    /* ==================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const productObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                productObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona APENAS os cartões de produto
    const revealElements = document.querySelectorAll('.produto-card.reveal-item');
    revealElements.forEach(element => {
        productObserver.observe(element);
    });

    /* ==================================== */
    /* 3. FUNCIONALIDADE CICLO DIA/NOITE (DARK MODE) 🌙 */
    /* ==================================== */
    
    const themeToggleButton = document.querySelector('.theme-toggle-btn');
    const body = document.body;

    // Função para aplicar/alternar o tema
    const toggleDarkMode = () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        // Salva a preferência no armazenamento local para que persista na próxima visita
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    // ➡️ 3.1. Carregar o tema preferido ao carregar a página
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Aplica o tema se houver preferência salva OU se o sistema operacional preferir dark
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
        }
    };

    // ➡️ 3.2. Adicionar listener ao botão de alternância
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleDarkMode);
    }

    loadTheme();
});
