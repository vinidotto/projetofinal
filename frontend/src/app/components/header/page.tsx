'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [showAvaliadoresMenu, setShowAvaliadoresMenu] = useState(false);
  const [showEquipesMenu, setShowEquipesMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleMouseEnterAvaliadores = useCallback(() => {
    setShowAvaliadoresMenu(true);
  }, []);

  const handleMouseLeaveAvaliadores = useCallback(() => {
    setTimeout(() => setShowAvaliadoresMenu(false), 1200);
  }, []);

  const handleMouseEnterEquipes = useCallback(() => {
    setShowEquipesMenu(true);
  }, []);

  const handleMouseLeaveEquipes = useCallback(() => {
    setTimeout(() => setShowEquipesMenu(false), 1200);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('token', 'someToken'); 
    checkLoginStatus(); 
    router.push('/'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); 
    router.push('/login'); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="ps-8 pe-8 bg-customColor text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-7">
          <img src="/logo_.png" alt="Logo" width={100} />
          <div className="hidden md:flex gap-7 items-center">
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
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <img src="/burger.svg" alt="Menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden md:flex gap-4 items-center">
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
              onClick={handleLogin}
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-25 left-0 w-80 bg-customColor text-white shadow-lg">
          <Link
            className="block px-4 py-2 hover:bg-gray-700"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Página Inicial
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-700"
            href="/newAvaliador"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cadastrar Avaliador
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-700"
            href="/listarAvaliadores"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Listar Avaliadores
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-700"
            href="/newEquipe"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cadastrar Equipes
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-700"
            href="/listarEquipes"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Listar Equipes
          </Link>
          {isLoggedIn && (
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/newAvaliacao"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Registrar Nota
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
