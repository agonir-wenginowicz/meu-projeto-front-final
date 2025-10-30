const SPA_CONTAINER_ID = 'spa-content';
const CONTENT_PATH = 'content/';

const loadPageContent = async (page) => {
    const container = document.getElementById(SPA_CONTAINER_ID);
    if (!container) return;

    try {
        // Manipulação do DOM: Mostra um estado de carregamento
        container.innerHTML = '<section class="hero"><h2 id="hero-title">Carregando...</h2></section>';
        
        // 1. Fetch para buscar o conteúdo HTML da "página"
        const response = await fetch(`${CONTENT_PATH}${page}`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar a página: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // 2. Manipulação do DOM: Injeta o novo conteúdo
        container.innerHTML = html;
        
        // 3. Execução de funções específicas após carregar o conteúdo
        if (page === 'projetos.html') {
            // Se for a página de projetos, renderiza os cards dinâmicos
            renderProjects(); 
        } else if (page === 'cadastro.html') {
            // Se for a página de cadastro, configura o listener de formulário
            setupFormListener();
        }

    } catch (error) {
        console.error("Falha no SPA:", error);
        container.innerHTML = '<section class="hero"><h2 id="hero-title" class="alert alert-error">Erro ao carregar o conteúdo.</h2></section>';
    }
};

const handleNavigation = (event) => {
    // 1. Tente encontrar o link com a classe nav-link ou o link mais próximo
    const target = event.target.closest('a'); 

    // 2. Garanta que é um link que queremos interceptar (e que não é um link externo ou #)
    if (target && target.classList.contains('nav-link')) { 
        
        // 🔑 Adicione este log para confirmar que a INTERCEPTAÇÃO está funcionando
        console.log(`[SPA Nav] Interceptado link com data-path: ${target.getAttribute('data-path')}`);
        
        event.preventDefault(); // Impede o envio padrão que causa o "Not Found"

        const path = target.getAttribute('data-path');
        
        // Atualiza a URL do navegador
        window.history.pushState({ path: path }, '', `/${path}`);
        
        // Carrega o conteúdo da nova "página"
        loadPageContent(path);
        
        // Opcional: Fecha o menu mobile se estiver aberto
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false; 
        }
    }
};

// Inicialização: Carrega o conteúdo da página inicial ao abrir o site
// js/spa.js

// 🔑 NOVA FUNÇÃO: Anexa o listener ao container do SPA
const attachSpaListeners = () => {
    const container = document.getElementById(SPA_CONTAINER_ID);
    if (container) {
        // Usa o container como alvo do listener, em vez do document
        container.addEventListener('click', handleNavigation);
        console.log('[SPA Listeners] Event listener anexado ao #spa-content.');
    }
};

// ...

// NO SEU js/spa.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 🔑 REVERTA ESTA LINHA: Anexe o listener de clique de volta ao 'document'
    document.addEventListener('click', handleNavigation); 
    
    // 2. Inicializa a navegação inicial
    const initialPath = window.location.pathname.split('/').pop() || 'index.html';
    loadPageContent(initialPath);

    // 3. Listener para o botão Voltar/Avançar do navegador
    window.addEventListener('popstate', (event) => {
        const path = event.state && event.state.path ? event.state.path : 'index.html';
        loadPageContent(path);
    });

    console.log(`SPA Iniciado. Caminho atual: ${initialPath}`);
});