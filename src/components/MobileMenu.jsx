import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Home, MessageSquare, Phone } from 'lucide-react';

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setCurrentLanguage(path.startsWith('/en') ? 'en' : 'es');
    }
  }, []);

  const toggleLanguage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const newLang = currentLanguage === 'es' ? 'en' : 'es';
      const newPath = newLang === 'en' ? '/en' + path : path.replace('/en', '') || '/';
      window.location.href = newPath;
    }
  };

  const getLocalizedHref = (href) =>
    currentLanguage === 'en' ? '/en' + href : href;

  const menuItems = [
    { href: '/', icon: Home, label: 'HOME', labelEs: 'INICIO' },
    { href: '/chat', icon: MessageSquare, label: 'CHAT', labelEs: 'CHAT' },
    { href: '/contact', icon: Phone, label: 'CONTACT', labelEs: 'CONTACTO' }
  ];

  const submenuItems = [
    { page: 'BIENES RAICES O INMOBILIARIO', pageEn: 'REAL ESTATE', href: '/bienes-raices-inmobiliario' },
    { page: 'PODERES', pageEn: 'POWERS OF ATTORNEY', href: '/poderes' },
    { page: 'SOCIETARIO', pageEn: 'CORPORATE', href: '/societario' },
    { page: 'SALIDAS MENORES', pageEn: 'MINOR EXIT PERMITS', href: '/salida-de-menores' },
    { page: 'ESCRITURAS ELECTRÓNICAS', pageEn: 'ELECTRONIC DEEDS', href: '/escrituras-electronicas' }
  ];

  return (
    <div className="md:hidden container mx-auto p-6 relative z-50">
      <div className="flex items-center justify-between">
        <img src="/lexdata-logo.svg" alt="lexdata logo" className="w-48" />
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg space-y-4">
          {menuItems.map(({ href, icon: Icon, label, labelEs }, index) => (
            <a
              key={index}
              href={getLocalizedHref(href)}
              className="flex items-center gap-2 text-lg text-emerald-700 hover:underline"
            >
              <Icon size={20} />
              <span>{currentLanguage === 'es' ? labelEs : label}</span>
            </a>
          ))}

          <div className="pt-4 border-t border-stone-300 space-y-2">
            {submenuItems.map(({ href, page, pageEn }, index) => (
              <a
                key={index}
                href={getLocalizedHref(href)}
                className="block text-emerald-700 hover:underline font-semibold"
              >
                {currentLanguage === 'es' ? page : pageEn}
              </a>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-2">
            <button onClick={toggleLanguage} className="text-3xl">
              {currentLanguage === 'es' ? '🇺🇸' : '🇪🇸'}
            </button>
            <span className="text-sm">{currentLanguage === 'es' ? 'ESP' : 'ENG'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
