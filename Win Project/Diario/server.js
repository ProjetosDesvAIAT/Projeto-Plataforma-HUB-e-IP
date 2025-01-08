const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Rota para obter `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para salvar os dados em JSON com data
app.post('/salvar-json', (req, res) => {
    const { turma, data, alunos } = req.body;

    // Estrutura para salvar as chamadas
    const dadosChamada = {
        turma,
        data,
        alunos
    };

    // Ler dados existentes (se houver)
    let chamadas = [];
    if (fs.existsSync('presenca_dados.json')) {
        chamadas = JSON.parse(fs.readFileSync('presenca_dados.json', 'utf8'));
    }

    // Adicionar nova chamada
    chamadas.push(dadosChamada);
    fs.writeFileSync('presenca_dados.json', JSON.stringify(chamadas, null, 2));

    console.log(`Chamada de ${turma} salva para a data ${data}`);
    res.status(200).send({ message: "Dados salvos com sucesso!" });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// rota para buscar chamadas por data no backend
app.get('/consulta/:data', (req, res) => {
    const data = req.params.data;
    const chamadas = JSON.parse(fs.readFileSync('presenca_dados.json', 'utf8'));

    const chamadasPorData = chamadas.filter(chamada => chamada.data === data);

    if (chamadasPorData.length > 0) {
        res.status(200).json(chamadasPorData);
    } else {
        res.status(404).send({ message: "Nenhuma chamada encontrada para essa data." });
    }
});

app.get('/dados', (req, res) => {
    try {
        const dados = fs.readFileSync('dados.json', 'utf8');
        res.status(200).json(JSON.parse(dados)); // Envia o JSON das turmas
    } catch (error) {
        console.error("Erro ao carregar o arquivo dados.json:", error);
        res.status(500).send({ message: "Erro ao carregar as turmas" });
    }
});

