const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;


const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/empresa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empresa.html'));
});

app.get('/trabalheconosco', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'trabalheconosco.html'));
});

app.get('/proposta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'proposta.html'));
});

//porta de entrada
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor estático iniciado com sucesso!`);
  console.log(` Acessível na porta: ${PORT}`);
});





app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Configurar o SMTP (exemplo usando Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pedromaianor@gmail.com',       // Seu e-mail //trocar
            pass: '201025061511aA#' // Senha ou senha de app trocar
        }
    });

    let mailOptions = {
        from: email,
        to: 'pedromaianor@gmail.com', //trocar
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