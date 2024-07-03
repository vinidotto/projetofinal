"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="ps-8 pe-8 bg-customColor text-white py-8">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex gap-7 items-center">
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/"
            >
              Página Inicial
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/newAvaliador"
            >
              Cadastrar Avaliador
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/listarAvaliadores"
            >
              Listar Avaliadores
            </Link>
          </div>
          <div className="flex gap-7 items-center">
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/listarEquipes"
            >
              Listar Equipes
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/newEquipe"
            >
              Cadastrar Equipes
            </Link>
          </div>
          <div>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/login"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
