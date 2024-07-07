'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Equipe {
  id: number;
  nome: string; 
}

const ListaEquipes = () => {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await fetch('/api/equipes');
        if (!response.ok) {
          throw new Error('Erro ao buscar equipes');
        }
        const data = await response.json();
        setEquipes(data);
      } catch (error) {
        console.error('Erro ao buscar equipes:', error);
      }
    };

    fetchEquipes();
  }, []);
  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/equipes');
        setEquipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar equipes:', error);
        setLoading(false);
      }
    };

    fetchEquipes();
  }, []);

  const handleDelete = async (equipe: Equipe) => {
    if (confirm(`Tem certeza que deseja excluir a equipe ${equipe.nome}?`)) {
      try {
        await axios.delete(`http://localhost:3001/api/equipes/${equipe.id}`);
        console.log('Equipe removida com sucesso.');

        setEquipes(equipes.filter(t => t.id !== equipe.id));
      } catch (error) {
        console.error('Erro ao excluir equipe:', error);
        alert('Erro ao excluir equipe.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Equipes</h1>
      <div className=" text-black flex flex-wrap justify-center items-center gap-4">
        {equipes.length > 0 ? (
          equipes.map((equipe) => (
            <div key={equipe.id} className="bg-white p-4 rounded-lg shadow-md w-60">
              <h2 className="text-xl font-bold mb-2">{equipe.nome}</h2>
              <p className="text-gray-600 mb-2">ID: {equipe.id}</p>
              <button
                onClick={() => handleDelete(equipe)}
                className="bg-red hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                Excluir
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">Nenhuma equipe encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ListaEquipes;
