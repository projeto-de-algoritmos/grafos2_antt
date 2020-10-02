import React, { useState, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import ReactLoading from 'react-loading';
import './App.css';

const states = [
  { id: 'AL', group: 'AL' },
  { id: 'AP', group: 'AP' },
  { id: 'AM', group: 'AM' },
  { id: 'BA', group: 'BA' },
  { id: 'CE', group: 'CE' },
  { id: 'DF', group: 'DF' },
  { id: 'ES', group: 'ES' },
  { id: 'GO', group: 'GO' },
  { id: 'MA', group: 'MA' },
  { id: 'MT', group: 'MT' },
  { id: 'MS', group: 'MS' },
  { id: 'MG', group: 'MG' },
  { id: 'PA', group: 'PA' },
  { id: 'PB', group: 'PB' },
  { id: 'PR', group: 'PR' },
  { id: 'PE', group: 'PE' },
  { id: 'PI', group: 'PI' },
  { id: 'RJ', group: 'RJ' },
  { id: 'RN', group: 'RN' },
  { id: 'RS', group: 'RS' },
  { id: 'RO', group: 'RO' },
  { id: 'RR', group: 'RR' },
  { id: 'SC', group: 'SC' },
  { id: 'SP', group: 'SP' },
  { id: 'SE', group: 'SE' },
  { id: 'TO', group: 'TO' }
]

const App = () => {
  const [graph, setGraph] = useState();
  const [data, setData] = useState({});
  const [distance, setDistance] = useState();
  const [path, setPath] = useState();
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(states.map(state => states.filter(s => state.id !== s.id).map(s => ({ source: state.id, target: s.id }))).flat(1));

  useEffect(() => {
    (async() => {
      const response = await fetch('http://localhost:5000').then(res => res.json());
      setGraph(response);
    })();
  }, []);

  const submit = async(event) => {
    event.preventDefault();
    if (!data.origem || !data.destino) {
      alert('Selecione uma origem e um destino!');
      return;
    }
    setLoading(true);
    const response = await fetch('http://localhost:5000/rotas', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ municipio_origem: data.origem, municipio_destino: data.destino })
    }).then(res => res.json());
    setLoading(false);
    setDistance(response.distancia);
    let links = [];
    response.estados.forEach((estado, index) => {
      if (index === 0) {
        return;
      }
      links.push({ source: response.estados[index - 1], target: estado });
    });
    setLinks(links)
    setPath(response.path);
  }

  const changeOrigin = ({ target: { value: origem }}) => setData({ ...data, origem });

  const changeDestination = ({ target: { value: destino }}) => setData({ ...data, destino });

  if (!graph?.nodes?.length) {
    return <ReactLoading type='spin' color='black' height={100} width={100} />;
  }

  const options = graph.nodes.map((city) => <option value={city} key={city}>{city}</option>);

  return (
    <form onSubmit={submit}>
      <label>
        Origem:
        <select value={data.origem} onChange={changeOrigin}>
          <option />
          {options}
        </select>
      </label>
      <label>
        Destino:
        <select value={data.destino} onChange={changeDestination}>
          <option />
          {options}
        </select>
      </label>
      <input type='submit' value='Enviar' />
      {loading ? (<ReactLoading type='spin' color='black' height={100} width={100} />) : distance && path && (
        <>
          <h1>{path.join(', ')}</h1>
          <h1>{`Distância: ${ distance } km`}</h1>
        </>
      )}
      <ForceGraph2D
        graphData={{
          nodes: states,
          links
        }}
        nodeAutoColorBy='group'
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 16/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);
          ctx.fill();
        }}
      />
    </form>
  );
}

export default App;
