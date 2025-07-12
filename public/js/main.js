
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

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Configurar o SMTP (exemplo usando Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pedromaianor@gmail.com',       // Seu e-mail
            pass: '201025061511aA#' // Senha ou senha de app
        }
    });

    let mailOptions = {
        from: email,
        to: 'pedromaianor@gmail.com',
        subject: `Mensagem de ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Falha ao enviar e-mail.' });
    }
});

