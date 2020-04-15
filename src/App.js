import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: Date.now(),
      title: 'Desafio FrontEnd com ReactJSA',
      techs: ['ReactJS', 'NodeJS'],
      url: 'https://github.com/charliedeus/bootcamp-2020-02-desafio-conceitos-reactjs'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  async function loadRepositories() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();
  }, [])

  return (
    <div>
      <h1>Repositories: </h1>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
