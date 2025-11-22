const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos (HTML, CSS, JS, Imagens)
// Ele aponta para a pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal (opcional, pois o express.static já busca o index.html automaticamente)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`👟 Shoeasy Project está online!`);
});