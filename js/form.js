const CADASTRO_FORM_ID = 'form-cadastro';

const handleFormSubmit = (event) => {
    event.preventDefault(); // Impede o envio tradicional (recarregar a página)
    
    const form = event.target;
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const password = form.querySelector('#password').value;
    const alertContainer = document.getElementById('form-alert');
    
    let isValid = true;
    let message = '';
    
    // --- Sistema de verificação de consistência de dados ---
    if (name.length < 3) {
        isValid = false;
        message += 'O nome deve ter pelo menos 3 caracteres. ';
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        isValid = false;
        message += 'O email inserido não é válido. ';
    }
    
    if (password.length < 6) {
        isValid = false;
        message += 'A senha deve ter no mínimo 6 caracteres.';
    }
    
    // --- Manipulação do DOM: Aviso ao Usuário ---
    if (isValid) {
        // 1. Armazenamento Local (localStorage)
        const userData = {
            name: name,
            email: email,
            registrationDate: new Date().toISOString()
        };
        localStorage.setItem('userProfile', JSON.stringify(userData));
        
        // 2. Feedback de Sucesso
        alertContainer.className = 'alert alert-success';
        alertContainer.textContent = `Cadastro realizado com sucesso, ${name}! Seus dados foram salvos localmente.`;
        form.reset(); // Limpa o formulário
        console.log('Dados salvos no LocalStorage:', userData);
        
    } else {
        // 3. Feedback de Erro
        alertContainer.className = 'alert alert-error';
        alertContainer.textContent = `Atenção: ${message}`;
    }
};

// Adiciona o evento de submissão ao formulário (Chamado pelo SPA.js)
const setupFormListener = () => {
    const form = document.getElementById(CADASTRO_FORM_ID);
    if (form) {
        // Adiciona evento
        form.addEventListener('submit', handleFormSubmit);
        console.log('Listener de formulário configurado.');
    }
};
