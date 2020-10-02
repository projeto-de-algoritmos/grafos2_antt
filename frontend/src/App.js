import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import './App.css';

const App = () => {
  const [graph, setGraph] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    (async() => {
      const response = await fetch('http://localhost:5000').then(res => res.json());
      setGraph(response);
    })();
  }, []);

  const submit = (event) => {
    if (!data.origem || !data.destino) {
      alert('Selecione uma origem e um destino!');
      return;
    }
    event.preventDefault();
  }

  const changeOrigin = ({ target: { value: origem }}) => setData({ ...data, origem });

  const changeDestination = ({ target: { value: destino }}) => setData({ ...data, destino });

  if (!graph?.nodes?.length) {
    return <ReactLoading type='spin' color='black' height={100} width={100} />;
  }

  const options = graph.nodes.map((city) => <option value={city}>{city}</option>);

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
    </form>
  );
}

export default App;
