
//passador de tela
document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    const items = document.querySelectorAll('.list .item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.querySelector('.dots');
    let dots = [];

    let currentActive = 0; 
    let autoSlideInterval;

    const transitionTime = 5000; 

    if (items.length === 0) {
        return; 
    }

    const createDots = () => {
        dotsContainer.innerHTML = '';
        dots = [];

        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentActive) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlider(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    };

    const showSlider = (index) => {
        if (items[currentActive]) {
            items[currentActive].classList.remove('active');
        }
        if (dots[currentActive]) {
            dots[currentActive].classList.remove('active');
        }

        currentActive = index;

        if (items[currentActive]) {
            items[currentActive].classList.add('active');
        }
        if (dots[currentActive]) {
            dots[currentActive].classList.add('active');
        }
    };

    const nextSlide = () => {
        let nextIndex = currentActive + 1;
        if (nextIndex >= items.length) {
            nextIndex = 0;
        }
        showSlider(nextIndex);
    };

    const startAutoSlide = () => {
        clearInterval(autoSlideInterval); 
        autoSlideInterval = setInterval(nextSlide, transitionTime);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    createDots();

    showSlider(currentActive); 

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentActive - 1;
            if (prevIndex < 0) {
                prevIndex = items.length - 1;
            }
            showSlider(prevIndex);
            resetAutoSlide();
        });
    }

    startAutoSlide();
});

//captcha

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contato");
    const status = document.getElementById("mensagem-status");
    const btn = document.getElementById("btn-enviar");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Verifica se o reCAPTCHA foi validado
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            status.textContent = "Por favor, confirme que você não é um robô.";
            status.style.color = "red";
            return;
        }

        btn.disabled = true;
        status.textContent = "Enviando...";
        status.style.color = "#333";

        // Envia o formulário via EmailJS
        emailjs.sendForm("service_4d4485w", "template_zx5y9uc", "#form-contato")
            .then(() => {
                status.textContent = "Mensagem enviada com sucesso!";
                status.style.color = "green";
                form.reset();
                grecaptcha.reset();
            })
            .catch((error) => {
                status.textContent = "Erro ao enviar. Por favor, tente novamente.";
                status.style.color = "red";
                console.error("Erro ao enviar email:", error);
                grecaptcha.reset();
            })
            .finally(() => {
                btn.disabled = false;
            });
    });
});






// emailjs proposta


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('proposta-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.sendForm('service_44qyope', 'template_8x162r5', this)
            .then(function () {
                showToast('Proposta enviada com sucesso!');
                form.reset();
            }, function (error) {
                showToast('Erro ao enviar. Tente novamente.');
                console.log('FAILED...', error);
            });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 500);
        }, 3000);
    }
});

