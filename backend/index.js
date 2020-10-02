const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const Graph = require('./graph.js');

const app = express();
const port = 5000;

app.use(bodyParser.json())
app.use(cors());

let graph;

app.get('/', async(_, res) => {
  fs.readFile('data.json', (_, data) => {
    const linhas = JSON.parse(data);
  
    graph = new Graph();
    linhas.forEach(({ municipio_origem }) => {
      graph.addNode(municipio_origem);
    });

    linhas.forEach((linha) => {
      graph.addEdge(linha.municipio_origem, linha.municipio_destino, linha.extensao_secao);
    });

    res.send({nodes: graph.nodes.sort(), edges: graph.edges});  
  });
});

app.post('/rotas', function (req, res) {
  const data = req.body;
  res.send(graph.djikstraAlgorithm(data.municipio_origem, data.municipio_destino));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
