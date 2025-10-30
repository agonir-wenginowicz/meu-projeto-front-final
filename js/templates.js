// Função de Template JavaScript
const createProjectCard = (project) => {
    // Exemplo de verificação de consistência visual no template
    const badgeClass = project.status === "Em Captação" ? "badge-warning" : 
                       project.status === "Em Andamento" ? "badge-info" : 
                       "badge-success";
                       
    // Retorna a string do HTML (Template Literal)
    return `
        <article class="card col-12 col-md-6 col-lg-4">
            <img src="${project.image}" alt="${project.title}" class="card-img-top" height="200">
            <span class="badge ${badgeClass}">${project.status}</span>
            <div class="card-body">
                <h4>${project.title}</h4>
                <p class="muted">${project.area}</p>
                <p>${project.description}</p>
                
                <div class="progress-bar" role="progressbar" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-fill" style="width: ${project.progress}%;">
                        ${project.progress}%
                    </div>
                </div>
            </div>
            <a href="#" class="btn btn-primary">Detalhes</a>
        </article>
    `;
};

// Função de Renderização
const renderProjects = () => {
    // Pega o container onde a lista será injetada
    const container = document.getElementById('project-list');
    
    if (container && typeof PROJECT_DATA !== 'undefined') {
        // Manipulação do DOM: Mapeia os dados para templates e junta tudo
        const htmlContent = PROJECT_DATA
            .map(createProjectCard)
            .join('');
            
        // Injeta o HTML gerado no DOM
        container.innerHTML = htmlContent;
        console.log("Projetos renderizados via template JS.");
    }
};

// Chamada inicial (será chamada pelo SPA.js)
// renderProjects();
