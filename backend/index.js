const fs = require('fs');
const express = require('express');
const Graph = require('./graph.js');

const app = express();
const port = 5000;

app.get('/', async(_, res) => {
  fs.readFile('data.json', (_, data) => {
    // process data
    const linhas = JSON.parse(data);
  
    let graph = new Graph();
    linhas.forEach(({ municipio_origem }) => {
      graph.addNode(municipio_origem);
    });

    linhas.forEach((linha) => {
      graph.addEdge(linha.municipio_origem, linha.municipio_destino, linha.extensao_secao);
    });
  
    res.send(graph.djikstraAlgorithm('BRASILIA'));
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
