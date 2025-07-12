document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contato");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const status = document.getElementById("mensagem-status");
        const recaptchaResponse = grecaptcha.getResponse?.() ?? "";

        if (recaptchaResponse.length === 0) {
            status.textContent = "Por favor, confirme que você não é um robô.";
            status.style.color = "red";
            return;
        }

        const formData = new FormData(form);
        const pathname = window.location.pathname;

        let payload = {};

        if (pathname.includes("proposta")) {
            payload = {
                tipo: "Proposta",
                nome: formData.get("nome"),
                email: formData.get("email"),
                servico: formData.get("servico"),
                proposta: formData.get("proposta")
            };
        } else if (pathname.includes("trabalhe")) {
            payload = {
                tipo: "Trabalhe Conosco",
                nome: formData.get("nome"),
                email: formData.get("email"),
                telefone: formData.get("telefone"),
                mensagem: formData.get("mensagem")
            };
        }

        try {
            const response = await fetch("/enviar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            status.textContent = result.message;
            status.style.color = "green";
            form.reset();
            grecaptcha.reset?.();
        } catch (err) {
            console.error(err);
            status.textContent = "Erro ao enviar. Tente novamente.";
            status.style.color = "red";
        }
    });
});

// js/email_form_handler.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-contato');
    const mensagemStatus = document.getElementById('mensagem-status');
    const submitButton = form.querySelector('button[type="submit"]');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário e o redirecionamento

            submitButton.disabled = true; // Desabilita o botão para evitar múltiplos envios
            submitButton.textContent = 'Enviando...'; // Altera o texto do botão
            mensagemStatus.textContent = ''; // Limpa qualquer mensagem anterior
            mensagemStatus.className = ''; // Remove classes anteriores

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Para usar AJAX com Formsubmit.co, o action URL muda para /ajax/SEU_EMAIL
            const formAction = form.action.replace('/send/', '/ajax/');

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' // Importante para receber resposta JSON
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    mensagemStatus.textContent = 'Proposta enviada com sucesso! Em breve entraremos em contato.';
                    mensagemStatus.className = 'mensagem-sucesso'; // Adiciona uma classe para estilização
                    form.reset(); // Limpa o formulário após o envio
                } else {
                    // Trata erros específicos do Formsubmit.co, se houver
                    let errorMessage = 'Ocorreu um erro ao enviar a proposta. Tente novamente.';
                    if (result && result.message) {
                        errorMessage = `Erro: ${result.message}`;
                    }
                    mensagemStatus.textContent = errorMessage;
                    mensagemStatus.className = 'mensagem-erro'; // Adiciona uma classe para estilização
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                mensagemStatus.textContent = 'Proposta enviada com sucesso! Em breve entraremos em contato ';
                mensagemStatus.className = 'mensagem-erro';
            } finally {
                submitButton.disabled = false; // Reabilita o botão
                submitButton.textContent = 'ENVIAR'; // Restaura o texto do botão
            }
        });
    }
});
