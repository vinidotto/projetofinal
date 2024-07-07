'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { auth } from "../services/firebase/firebaseConfiguration";  
import { createUserWithEmailAndPassword } from "firebase/auth";

const NewAvaliador = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nome: "",
    login: "",
    senha: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    login: "",
    senha: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { nome: "", login: "", senha: "", email: "" };
    let isValid = true;

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório.";
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = "Login é obrigatório.";
      isValid = false;
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha é obrigatória.";
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter mais de 6 dígitos.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createAvaliadorInPostgres = async (firebaseID: string): Promise<number> => {
    try {
      const response = await axios.post('http://localhost:3001/api/avaliadores', {
        nome: formData.nome,
        login: formData.login,
        senha: formData.senha,
        email: formData.email,
        firebaseID: firebaseID,
      });
      return response.data.id; 
    } catch (error) {
      console.error("Erro ao enviar dados para o PostgreSQL:", error);
      throw new Error("Erro ao enviar dados para o PostgreSQL.");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const firebaseID = userCredential.user.uid;

      await createAvaliadorInPostgres(firebaseID);

      alert("Avaliador cadastrado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar avaliador:", error);
      alert("Erro ao cadastrar avaliador.");
    }
  };

  return (
    <div className="mt-10 flex justify-center bg-gray-100 p-2">
      <form className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Avaliador</h1>
        <div className="mb-4">
          <label className="font-semibold mb-2">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className={`border ${errors.nome ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-2">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Login"
            className={`border ${errors.login ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
        </div>
        <div className="mb-6">
          <label className="font-semibold mb-2">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Senha"
            className={`border ${errors.senha ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.senha && <p className="text-red-500 text-sm">{errors.senha}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-customColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Cadastrar Avaliador
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

export default NewAvaliador;
