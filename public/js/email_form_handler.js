document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contato");
    if (!form) return; // Garante que o formulário existe na página

    const submitButton = form.querySelector('button[type="submit"]');
    const mensagemStatus = document.getElementById('mensagem-status');

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário e o redirecionamento

        submitButton.disabled = true; // Desabilita o botão para evitar múltiplos envios
        submitButton.textContent = 'Enviando...'; // Altera o texto do botão
        mensagemStatus.textContent = ''; // Limpa qualquer mensagem anterior
        mensagemStatus.className = ''; // Remove classes de estilização anteriores

        const formData = new FormData(form);
        const data = {};
        // Coleta todos os dados do formulário com seus nomes originais
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Corrige a URL para usar o endpoint AJAX do Formsubmit.co
        // Ex: de "https://formsubmit.co/seuemail@dominio.com" para "https://formsubmit.co/ajax/seuemail@dominio.com"
        const formAction = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

        try {
            const response = await fetch(formAction, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"    // Essencial para receber a resposta JSON do Formsubmit.co
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                mensagemStatus.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
                mensagemStatus.style.color = "green";
                form.reset(); // Limpa o formulário após o envio bem-sucedido
            } else {
                // Trata erros retornados pelo Formsubmit.co
                let errorMessage = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';
                if (result && result.message) {
                    errorMessage = `Erro: ${result.message}`;
                }
                mensagemStatus.textContent = errorMessage;
                mensagemStatus.style.color = "red";
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            // Mensagem genérica para erros de rede ou outros problemas inesperados
            mensagemStatus.textContent = 'Houve um problema de conexão ou no servidor. Tente novamente mais tarde.';
            mensagemStatus.style.color = "red";
        } finally {
            submitButton.disabled = false; // Reabilita o botão
            submitButton.textContent = 'ENVIAR'; // Restaura o texto original do botão
        }
    });
});