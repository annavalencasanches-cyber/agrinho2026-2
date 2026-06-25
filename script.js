### 3. Código JavaScript (`script.js`)
Este arquivo cuida de toda a inteligência e dinamismo do site: gerencia o menu responsivo, altera o visual do cabeçalho ao rolar a página, gerencia o funcionamento das abas de conteúdo, aciona contadores numéricos progressivos e simula a validação avançada de formulários.

```javascript
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MENU RESPONSIVO (HAMBÚRGUER)
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // 2. ALTERAÇÃO DO HEADER E ATUALIZAÇÃO DOS LINKS ATIVOS NO SCROLL
    // ==========================================================================
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        const scrollY = window.pageYOffset;

        // Efeito blur/compactar header
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight do menu baseado na seção visível
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active-link');
                } else {
                    targetLink.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // ==========================================================================
    // 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL / INTERSECTION OBSERVER)
    // ==========================================================================
    const animItems = document.querySelectorAll('.scroll-anim');

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Se o elemento contiver contadores numéricos, dispara a animação deles
                if(entry.target.id === 'metricas') {
                    startCounters();
                }
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.25 });

    animItems.forEach(item => animObserver.observe(item));

    // ==========================================================================
    // 4. CONTADORES NUMÉRICOS ANIMADOS
    // ==========================================================================
    let countersStarted = false;

    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 150; // Quanto menor, mais rápido

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment > target ? target : count + increment;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // ==========================================================================
    // 5. INTERATIVIDADE DO SISTEMA DE ABAS (TABS)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove estados ativos atuais
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Ativa o botão clicado e seu respectivo painel
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ==========================================================================
    // 6. VALIDAÇÃO E FEEDBACK DO FORMULÁRIO DE CONTATO
    // ==========================================================================
    const form = document.getElementById('agroForm');
    const formFeedback = document.getElementById('formFeedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Captura e higieniza valores básicos
        const name = document.getElementById('name').value.trim();
        
        // Simulação de processamento de envio assíncrono (API/Backend)
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Restaura o botão
            submitBtn.innerText = 'Enviar Mensagem';
            submitBtn.disabled = false;

            // Exibe mensagem de sucesso customizada dinâmica
            formFeedback.innerText = `Obrigado, ${name}! Sua mensagem foi enviada. Nossa equipe entrará em contato em breve.`;
            formFeedback.classList.remove('hidden');
            formFeedback.classList.add('success');

            // Limpa o formulário após o sucesso
            form.reset();

            // Esconde o feedback após 6 segundos
            setTimeout(() => {
                formFeedback.classList.add('hidden');
                formFeedback.classList.remove('success');
            }, 6000);

        }, 1500); // 1.5 segundos de delay simulado de carregamento
    });
});
