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
    return <ReactLoading type='spin' color='black' style={{height: 50, width: 50, margin: '0 auto', marginTop: 50}} />;
  }

  const options = graph.nodes.map((city) => <option value={city} key={city}>{city}</option>);

  return (
    <form onSubmit={submit}>
        <header style={{textAlign: "center", marginTop: 30}}>
          <h1>Qual ônibus eu pego?</h1>
          <p className="tagline">Selecione aonde você está e aonde você quer ir que diremos quais ônibus pegar percorrendo a menor quantidade de quilômetros.</p>
          <sub>Todos os trajetos são linhas de ônibus cadastradas na ANTT</sub>
        </header>
      <div style={{textAlign: "center", marginTop: 50}}>
        <label>
          Selecione o Local de Partida:
          <select style={{marginLeft: 5}} value={data.origem} onChange={changeOrigin}>
            <option />
            {options}
          </select>
        </label>
        <label style={{marginLeft: 10}}>
          Selecione o Local Destino:
          <select style={{marginLeft: 5}} value={data.destino} onChange={changeDestination}>
            <option />
            {options}
          </select>
        </label>
        <br/><br/>
        <input type='submit' value='Enviar' />
          {loading ? (<ReactLoading type='spin' color='black' style={{height: 50, width: 50, margin: '0 auto'}} />) : distance && path && (
            <>
              <h2>Você deverá pegar ônibus passando por:</h2>
              <h3>{path.join(', ')}</h3>
              <h3>{`Distância total percorrida: ${ distance } km`}</h3>
            </>
          )}
      </div>

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
