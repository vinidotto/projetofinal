"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Equipe, Avaliador } from "../../types"; 

const VincularAvaliadorEquipe = () => {
  const router = useRouter();
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [selectedEquipe, setSelectedEquipe] = useState<string>("");
  const [selectedAvaliador, setSelectedAvaliador] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipesResponse, avaliadoresResponse] = await Promise.all([
          fetch("http://localhost:3001/api/equipes"),
          fetch("http://localhost:3001/api/avaliadores"),
        ]);

        if (!equipesResponse.ok || !avaliadoresResponse.ok) {
          throw new Error("Erro ao carregar dados.");
        }

        const equipesData: Equipe[] = await equipesResponse.json();
        const avaliadoresData: Avaliador[] = await avaliadoresResponse.json();

        setEquipes(equipesData);
        setAvaliadores(avaliadoresData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErrors("Erro ao carregar dados. Tente novamente mais tarde.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedEquipe || !selectedAvaliador) {
      setErrors("Selecione uma equipe e um avaliador.");
      return;
    }

    try {
      console.log("Selected Equipe ID:", selectedEquipe);
      console.log("Selected Avaliador ID:", selectedAvaliador);

      const response = await fetch("http://localhost:3001/api/equipe-avaliador/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({          
          equipeId: Number(selectedEquipe),
          avaliadorId: Number(selectedAvaliador),
        }),
      });

      if (response.ok) {
        setSuccessMessage("Avaliador vinculado à equipe com sucesso!");
        setSelectedEquipe("");
        setSelectedAvaliador("");
        setErrors("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao vincular avaliador e equipe.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setErrors("Erro ao vincular avaliador e equipe. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-customColor p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Vincular Avaliador a Equipe</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Selecione a Equipe</label>
            <select
              value={selectedEquipe}
              onChange={(e) => setSelectedEquipe(e.target.value)}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
            >
              <option value="">Escolha uma equipe</option>
              {equipes.map((equipe) => (
                <option key={equipe.id} value={String(equipe.id)}>
                  {equipe.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Selecione o Avaliador</label>
            <select
              value={selectedAvaliador}
              onChange={(e) => setSelectedAvaliador(e.target.value)}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
            >
              <option value="">Escolha um avaliador</option>
              {avaliadores.map((avaliador) => (
                <option key={avaliador.id} value={String(avaliador.id)}>
                  {avaliador.nome}
                </option>
              ))}
            </select>
          </div>
          {errors && <p className="text-red-500 text-sm mb-4 text-center">{errors}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Vincular
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VincularAvaliadorEquipe;
