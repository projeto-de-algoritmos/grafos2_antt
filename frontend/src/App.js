import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import './App.css';

const App = () => {
  const [graph, setGraph] = useState();
  const [data, setData] = useState({});
  const [distance, setDistance] = useState();
  const [loading, setLoading] = useState(false);

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
      <input type="submit" value="Enviar" />
      {loading ? (<ReactLoading type='spin' color='black' height={100} width={100} />) : distance && (
        <h1>{`Distância: ${ distance }`}</h1>
      )}
    </form>
  );
}

export default App;
