document.addEventListener('DOMContentLoaded', () => {

    /* ==================================== */
    /* 1. MENU HAMBURGER RESPONSIVO */
    /* ==================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        // Opcional: Animar o ícone hamburger
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
        threshold: 0.15 // Inicia quando 15% do elemento é visível
    };

    const productObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'active' para iniciar a animação CSS (slideUp)
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

    /* ==================================== */
    /* 3. FUNCIONALIDADE CICLO DIA/NOITE (DARK MODE) 🌙 */
    /* ==================================== */
    
    const themeToggleButton = document.querySelector('.theme-toggle-btn');
    const body = document.body;

    // Função para aplicar/alternar o tema
    const toggleDarkMode = () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        // Salva a preferência no armazenamento local para que persista
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    // ➡️ 3.1. Carregar o tema preferido ao carregar a página
    const loadTheme = () => {
        // Verifica a preferência salva ou usa a preferência do sistema como fallback
        const savedTheme = localStorage.getItem('theme');
        // Verifica se o sistema operacional prefere o modo escuro
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Se houver tema salvo (e for 'dark') OU se não houver tema salvo E o sistema preferir dark
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
        }
    };

    // ➡️ 3.2. Adicionar listener ao botão de alternância
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleDarkMode);
    }

    // Carregar o tema imediatamente
    loadTheme();
});