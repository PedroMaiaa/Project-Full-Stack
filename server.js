const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/empresa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'empresa.html'));
});

app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'serviços.html'));
});

app.get('/trabalheconosco', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'trabalheconosco.html'));
});

app.get('/proposta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'proposta.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});