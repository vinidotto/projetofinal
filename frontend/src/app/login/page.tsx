'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import signIn from "../services/firebase/auth/signin";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", senha: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório.";
      isValid = false;
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha é obrigatória.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const { result, error } = await signIn(formData.email, formData.senha);

    if (error) {
      console.error("Erro ao fazer login:", error);
      setErrors({ ...errors, email: "Credenciais inválidas." });
    } else if (result) {
      localStorage.setItem('token', result.token);
      router.push("/"); 
    } else {
      setErrors({ ...errors, email: "Erro inesperado ao fazer login." });
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <form className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Avaliador</h1>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Seu Email"
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Sua senha"
            className={`border ${errors.senha ? 'border-red-500' : 'border-gray-300'} w-full rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none`}
          />
          {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleLogin}
            className="bg-customColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => router.push("/newAvaliador")}
            className="bg-red hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Criar Cadastro
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
