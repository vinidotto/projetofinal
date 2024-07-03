'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

const newEquipe = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      setError("Nome da equipe é obrigatório.");
      return false;
    } else if (formData.nome.length < 3) {
      setError("Nome da equipe deve ter pelo menos 3 caracteres.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await instance.post("/equipes", formData);
      alert("Equipe cadastrada com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar equipe:", error);
      alert("Erro ao cadastrar equipe.");
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Equipe</h1>
        <div className="mb-4">
          <label className="font-semibold mb-2">Nome da Equipe</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da equipe"
            className={`border ${error ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-customColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Cadastrar Equipe
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-red hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default newEquipe;
