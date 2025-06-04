import React, { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <img src="/lexdata-logo.svg" alt="lexdata logo" className="w-48" />
        </div>
        <div>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <svg
              className="w-8 h-8 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <a href="/" className="block text-gray-700 text-lg">Inicio</a>
          <a href="/contact" className="block text-gray-700 text-lg">Contacto</a>
          <a href="/en/tramites" className="block text-gray-700 text-lg">Trámites</a>
          {/* Agrega más enlaces según necesites */}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
