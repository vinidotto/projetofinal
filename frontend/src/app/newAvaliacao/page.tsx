"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Avaliador {
  id: number;
  nome: string;
}

interface Equipe {
  id: number;
  nome: string;
}

interface Notas {
  originalidade: number;
  impacto: number;
  execucao: number;
  apresentacao: number;
  viabilidade: number;
}

const AvaliacaoForm = () => {
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [selectedAvaliador, setSelectedAvaliador] = useState<number | ''>('');
  const [selectedEquipe, setSelectedEquipe] = useState<number | ''>('');
  const [notas, setNotas] = useState<Notas>({
    originalidade: 0,
    impacto: 0,
    execucao: 0,
    apresentacao: 0,
    viabilidade: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      const avaliadoresRes = await axios.get('http://localhost:3001/api/avaliadores');
      const equipesRes = await axios.get('http://localhost:3001/api/equipes');
      setAvaliadores(avaliadoresRes.data);
      setEquipes(equipesRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const avaliacao = {
      avaliador_id: selectedAvaliador,
      equipe_id: selectedEquipe,
      notas: notas,
    };

    console.log('Enviando Avaliação:', avaliacao);

    try {
      const response = await axios.post('http://localhost:3001/api/avaliacoes', avaliacao);
      console.log('Resposta da API:', response.data);
      alert('Avaliação salva com sucesso!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const validationErrors = error.response.data;
        const errorMessages: Record<string, string> = {};
        validationErrors.forEach((err: { path: string; msg: string }) => {
          errorMessages[err.path] = err.msg;
        });
        setErrors(errorMessages);
        console.error('Erros de Validação:', errorMessages);
      } else {
        console.error('Erro ao salvar avaliação:', error);
      }
    }
  };

  const handleNotaChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const value = Math.max(0, Number(event.target.value)); 
    setNotas({ ...notas, [key]: value });
  };

  return (
    <div className="mt-10 flex justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Avaliação</h1>
        <div className="mb-4">
          <label className="font-semibold mb-2">Avaliador</label>
          <select
            value={selectedAvaliador}
            onChange={(e) => setSelectedAvaliador(Number(e.target.value))}
            className={`border ${errors.avaliador_id ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          >
            <option value="">Selecione um avaliador</option>
            {avaliadores.map(avaliador => (
              <option key={avaliador.id} value={avaliador.id}>{avaliador.nome}</option>
            ))}
          </select>
          {errors.avaliador_id && <p className="text-red-500 text-sm">{errors.avaliador_id}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-2">Equipe</label>
          <select
            value={selectedEquipe}
            onChange={(e) => setSelectedEquipe(Number(e.target.value))}
            className={`border ${errors.equipe_id ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          >
            <option value="">Selecione uma equipe</option>
            {equipes.map(equipe => (
              <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
            ))}
          </select>
          {errors.equipe_id && <p className="text-red-500 text-sm">{errors.equipe_id}</p>}
        </div>
        {['originalidade', 'impacto', 'execucao', 'apresentacao', 'viabilidade'].map((criterio) => (
          <div className="mb-4" key={criterio}>
            <label className="font-semibold mb-2">{criterio.charAt(0).toUpperCase() + criterio.slice(1)}</label>
            <input
              type="number"
              value={notas[criterio as keyof Notas]}
              onChange={(e) => handleNotaChange(e, criterio)}
              min="0" 
              className={`border ${errors[criterio] ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
            />
            {errors[criterio] && <p className="text-red-500 text-sm">{errors[criterio]}</p>}
          </div>
        ))}
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-customColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Salvar Avaliação
          </button>
          <button
            type="button"
            onClick={() => window.location.href = "/"}
            className="bg-red hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvaliacaoForm;
