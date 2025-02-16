const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use((req, res, next) => { //corrigir erro CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

const imagens = [
    'garfield1.jpg',
    'garfield2.png',
    'garfield3.gif',
    'garfield4.jpg',
    'garfield8.png',
    'garfield20.jpg'
];

//index da imagem atual
let indexAtual = 0;

app.get('/imagens', (req, res) => {
    const imagemAtual = imagens[indexAtual];
    const imagemUrl = `http://localhost:${port}/imagens/${imagemAtual}`;
    
    // atualiza o index para a prax imagem e volta pra primeira dps da última
    indexAtual = (indexAtual + 1) % imagens.length;
    
    // Retorna a URL da imagem como um JSON
    res.json({ url: imagemUrl });
});

// Serve arquivos estáticos da pasta 'imagens' no endpoint '/imagens'
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});