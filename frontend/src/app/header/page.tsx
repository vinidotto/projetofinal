'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [showAvaliadoresMenu, setShowAvaliadoresMenu] = useState(false);
  const [showEquipesMenu, setShowEquipesMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMouseEnterAvaliadores = useCallback(() => {
    setShowAvaliadoresMenu(true);
  }, []);

  const handleMouseLeaveAvaliadores = useCallback(() => {
    setTimeout(() => setShowAvaliadoresMenu(false), 2000);
  }, []);

  const handleMouseEnterEquipes = useCallback(() => {
    setShowEquipesMenu(true);
  }, []);

  const handleMouseLeaveEquipes = useCallback(() => {
    setTimeout(() => setShowEquipesMenu(false), 2000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

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
            <div
              className="relative"
              onMouseEnter={handleMouseEnterAvaliadores}
              onMouseLeave={handleMouseLeaveAvaliadores}
            >
              <span className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                Avaliadores
              </span>
              {showAvaliadoresMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-customColor text-white shadow-lg">
                    <Link
                      className="block px-4 py-2 hover:bg-gray-700"
                      href="/newAvaliador"
                    >
                      Cadastrar Avaliador
                    </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-700"
                    href="/listarAvaliadores"
                  >
                    Listar Avaliadores
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={handleMouseEnterEquipes}
              onMouseLeave={handleMouseLeaveEquipes}
            >
              <span className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                Equipes
              </span>
              {showEquipesMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-customColor text-white shadow-lg">
                  <Link
                    className="block px-4 py-2 hover:bg-gray-700"
                    href="/newEquipe"
                  >
                    Cadastrar Equipes
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-700"
                    href="/listarEquipes"
                  >
                    Listar Equipes
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {isLoggedIn && (
              <Link
                className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
                href="/newAvaliacao"
              >
                Registrar Nota
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
