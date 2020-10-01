import React, { useState, useEffect } from 'react';

import lines from './assets/linhas.json';

function Graph(){
    let objLine = {};
    const [edges, setEdges] = useState({});
    const [nodes, setNodes] = useState([]);
    
    function addNode(node) {
        let stateNodes = nodes;
        stateNodes.push(node)
        setNodes(stateNodes);
        setEdges({node: []});
    }

    // const addEdge = (node1, node2, weight = 1) => {
    //     this.edges[node1].push({ node: node2, weight: weight });
    //     this.edges[node2].push({ node: node1, weight: weight });
    // }

    const display = () => {
        let graph = "";
        console.log({nodes})
        nodes.forEach(node => {
           graph += node + "->" + edges[node].map(n => n.node).join(", ") + "\n";
        });
        console.log(graph);
    }

    const readJSON = () => {
        for(var line in lines.empresas_habilitadas_regular) {
            objLine = {
                "prefixo": lines.empresas_habilitadas_regular[line].prefixo,
                "descricao_linha": lines.empresas_habilitadas_regular[line].descricao_linha,
                "municipio_origem": lines.empresas_habilitadas_regular[line].municipio_origem,
                "uf_origem": lines.empresas_habilitadas_regular[line].uf_origem,
                "municipio_destino": lines.empresas_habilitadas_regular[line].municipio_destino,
                "uf_destino": lines.empresas_habilitadas_regular[line].uf_destino,
                "extensao_secao": lines.empresas_habilitadas_regular[line].extensao_secao
            }
            addNode(objLine);
            // addEdge(objLine,objLine, objLine.extensao_secao);
         }

        display();

    }

    useEffect(() => {
        readJSON();
    }, [])

    return (
        <div>
            pai tá on
        </div>
    )
}

export default Graph;