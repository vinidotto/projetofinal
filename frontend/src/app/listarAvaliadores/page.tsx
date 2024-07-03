'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, deleteUser } from 'firebase/auth';
import { app } from '../services/firebase/firebaseConfiguration'; 

const auth = getAuth(app);

interface Avaliador {
  id: number;
  nome: string;
  login: string;
  firebaseID: string; 
}

const ListaAvaliadores = () => {
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvaliadores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/avaliadores');
        setAvaliadores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar avaliadores:', error);
        setLoading(false);
      }
    };

    fetchAvaliadores();
  }, []);

  const handleDelete = async (avaliador: Avaliador) => {
    if (confirm(`Tem certeza que deseja excluir o avaliador ${avaliador.nome}?`)) {
      try {
        await axios.delete(`http://localhost:3001/api/avaliadores/${avaliador.id}`);
        console.log('Avaliador removido do PostgreSQL com sucesso.');
        setAvaliadores(avaliadores.filter(a => a.id !== avaliador.id));
      } catch (error) {
        console.error('Erro ao excluir avaliador:', error);
        alert('Erro ao excluir avaliador.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Avaliadores</h1>
      <div className="text-black flex flex-wrap justify-center gap-4">
        {avaliadores.length > 0 ? (
          avaliadores.map((avaliador) => (
            <div key={avaliador.id} className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
              <h2 className="text-xl font-bold mb-2">{avaliador.nome}</h2>
              <p className="text-gray-600 mb-2">ID: {avaliador.id}</p>
              <p className="text-gray-600 mb-2">Login: {avaliador.login}</p>
              <button
                onClick={() => handleDelete(avaliador)}
                className="bg-red hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Excluir
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">Nenhum avaliador encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ListaAvaliadores;
