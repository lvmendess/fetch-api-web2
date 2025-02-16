const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let contSim = 0, contNao = 0;

app.get('/contador', (req, res) => {
    res.json({"sim":contSim, "nao":contNao});
});

app.post('/contador', (req, res) => {
    const { operacao } = req.body;
    if (operacao === 'sim'){
        contSim++;
        res.status(200).send('Contador atualizado com sucesso.');
    } else if (operacao === 'nao') {
        contNao++;
        res.status(200).send('Contador atualizado com sucesso.');
    } else {
        res.status(400).send('Operação inválida.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/satisfacao.html');
});

// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});