'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Equipe, Avaliador, Avaliacao } from '../../types';

const ListarAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [equipeId, setEquipeId] = useState<string>('');
  const [avaliadorId, setAvaliadorId] = useState<string>('');
  const [equipeOptions, setEquipeOptions] = useState<Equipe[]>([]);
  const [avaliadorOptions, setAvaliadorOptions] = useState<Avaliador[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = 'http://localhost:3001/api/avaliacoes/';
        const params = new URLSearchParams();

        if (equipeId) params.append('equipeId', equipeId);
        if (avaliadorId) params.append('avaliadorId', avaliadorId);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        setAvaliacoes(response.data);
      } catch (error) {
        setError('Erro ao buscar avaliações.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, [equipeId, avaliadorId]);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const equipeResponse = await axios.get('http://localhost:3001/api/equipes/');
        const avaliadorResponse = await axios.get('http://localhost:3001/api/avaliadores/');

        setEquipeOptions(equipeResponse.data);
        setAvaliadorOptions(avaliadorResponse.data);
      } catch (error) {
        setError('Erro ao buscar opções.');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const getEquipeNameById = (id: string) => {
    const equipe = equipeOptions.find((e) => e.id === id);
    return equipe ? equipe.nome : 'Desconhecida';
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Filtrar por Equipe</label>
        <select
          value={equipeId}
          onChange={(e) => setEquipeId(e.target.value)}
          className="text-black border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">Selecione uma equipe</option>
          {equipeOptions.map((equipe) => (
            <option key={equipe.id} value={equipe.id}>
              {equipe.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Filtrar por Avaliador</label>
        <select
          value={avaliadorId}
          onChange={(e) => setAvaliadorId(e.target.value)}
          className="text-black border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">Selecione um avaliador</option>
          {avaliadorOptions.map((avaliador) => (
            <option key={avaliador.id} value={avaliador.id}>
              {avaliador.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Listagem de Avaliações</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Originalidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execução</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apresentação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Viabilidade</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black divide-y divide-gray-200">
            {avaliacoes.map((avaliacao) => (
              <tr key={avaliacao.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEquipeNameById(avaliacao.equipe_id)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.avaliador_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.notas?.originalidade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.notas?.impacto }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.notas?.execucao }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.notas?.apresentacao }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avaliacao.notas?.viabilidade }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarAvaliacoes;
