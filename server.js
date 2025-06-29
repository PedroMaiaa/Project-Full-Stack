const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

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