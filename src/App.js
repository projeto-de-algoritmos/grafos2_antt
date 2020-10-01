import React, { useState } from 'react';
import './App.css';
import Graph from './Graph';

function Map() {
  const [data, setData] = useState({});

  const graph = new Graph();

  const submit = (event) => {
    if (!data.origem || !data.destino) {
      alert('Selecione uma origem e um destino!');
      return;
    }
    event.preventDefault();
  }

  const changeOrigin = ({ target: { value: origem }}) => setData({ ...data, origem });

  const changeDestination = ({ target: { value: destino }}) => setData({ ...data, destino });

  return (
    <form onSubmit={submit}>
      <label>
        Origem:
        <select value={data.origem} onChange={changeOrigin}>
          <option />
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <label>
        Destino:
        <select value={data.destino} onChange={changeDestination}>
          <option />
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <input type="submit" value="Enviar" />
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
