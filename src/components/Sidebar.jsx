import { useState, useEffect, useRef } from 'react';
import { Home, Menu, MessageSquare, Phone } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const submenuRef = useRef(null);

  const menuItems = [
    { id: 'home', href: '/', icon: Home, label: 'HOME', labelEs: 'INICIO' },
    { id: 'menu', icon: Menu, label: 'MENU', labelEs: 'MENÚ' },
    { id: 'chat', href: 'https://api.whatsapp.com/send/?phone=593993536395&text=%C2%A1Hola%21+Estoy+visitando+su+sitio+web+y+deseo+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0', icon: MessageSquare, label: 'CHAT', labelEs: 'CHAT' },
  ];

  const submenuItems = [
    {
      page: 'BIENES RAICES O INMOBILIARIO',
      pageEn: 'REAL ESTATE',
      href: '/bienes-raices-inmobiliario'
    },
    {
      page: 'PODERES',
      pageEn: 'POWERS OF ATTORNEY',
      href: '/poderes'
    },
    {
      page: 'SOCIETARIO',
      pageEn: 'CORPORATE',
      href: '/societario'
    },
    {
      page: 'SALIDAS MENORES',
      pageEn: 'MINOR EXIT PERMITS',
      href: '/salida-de-menores'
    },
    {
      page: 'ESCRITURAS ELECTRÓNICAS',
      pageEn: 'ELECTRONIC DEEDS',
      href: '/escrituras-electronicas'
    }
  ];

  // Detectar idioma actual por URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setCurrentLanguage(path.startsWith('/en') ? 'en' : 'es');
    }
  }, []);

  // Establecer ítem activo basado en URL (excepto MENU)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;

      for (const item of menuItems) {
        if (item.id !== 'menu') {
          const localizedHref = getLocalizedHref(item);
          if (path === localizedHref) {
            setActiveItem(item.id);
            break;
          }
        }
      }
    }
  }, [currentLanguage]);

  const toggleLanguage = () => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      let newPath;

      if (currentLanguage === 'es') {
        newPath = '/en' + currentPath;
        setCurrentLanguage('en');
      } else {
        newPath = currentPath.replace('/en', '') || '/';
        setCurrentLanguage('es');
      }

      window.location.href = newPath;
    }
  };

  // Función corregida para manejar URLs externas
  const getLocalizedHref = (item) => {
    // Si la URL es externa (contiene http:// o https://), devolverla tal como está
    if (item.href.startsWith('http://') || item.href.startsWith('https://')) {
      return item.href;
    }
    // Si es una ruta interna, aplicar la localización
    return currentLanguage === 'en' ? '/en' + item.href : item.href;
  };

  // Cierre de submenú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-20 bg-secondary-background shadow-lg z-50 flex flex-col rounded-lg">
        <div className="h-16 flex items-center justify-center border-b border-stone-300">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/favicon.svg" alt="logo lexdata" />
          </div>
        </div>

        <div className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const displayLabel = currentLanguage === 'es' ? item.labelEs : item.label;

            let isActive = activeItem === item.id;
            if (item.id !== 'menu' && typeof window !== 'undefined') {
              const path = window.location.pathname;
              const localizedHref = getLocalizedHref(item);
              // Solo comparar con rutas internas
              if (!item.href.startsWith('http') && path === localizedHref) {
                isActive = true;
              }
            }

            if (item.id === 'menu') {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      setIsExpanded(!isExpanded);
                    }}
                    className={`w-full h-16 flex flex-col items-center justify-center transition-all duration-200 hover:bg-stone-300 ${
                      isActive ? 'bg-emerald-100 border-r-2 border-emerald-600' : ''
                    }`}
                  >
                    <Icon size={20} className={`mb-1 ${isActive ? 'text-emerald-600' : 'text-stone-600'}`} />
                    <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : 'text-stone-600'}`}>
                      {displayLabel}
                    </span>
                  </button>
                </div>
              );
            }

            return (
              <a href={getLocalizedHref(item)} key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full h-16 flex flex-col items-center justify-center transition-all duration-200 hover:bg-stone-300 ${
                    isActive ? 'bg-emerald-100 border-r-2 border-emerald-600' : ''
                  }`}
                >
                  <Icon size={20} className={`mb-1 ${isActive ? 'text-emerald-600' : 'text-stone-600'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : 'text-stone-600'}`}>
                    {displayLabel}
                  </span>
                </button>
              </a>
            );
          })}
        </div>

        <div className="border-t border-stone-300 p-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded hover:bg-stone-300 transition-colors"
              title={currentLanguage === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              <span className="text-3xl">{currentLanguage === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            </button>
            <span className="text-xs text-stone-600 text-center font-medium">
              {currentLanguage === 'es' ? 'ESP' : 'ENG'}
            </span>
          </div>
        </div>
      </div>

      {/* Submenú */}
      <div
        ref={submenuRef}
        className={`fixed left-20 top-1/2 -translate-y-1/2 bg-gray-100 shadow-lg transition-all duration-300 z-40 rounded-r-lg ${
          isExpanded ? 'w-80' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-6">
          <div className="space-y-3">
            {submenuItems.map((item, index) => (
              <a href={currentLanguage === 'es' ? item.href : '/en' + item.href} key={index}>
                <button className="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:border-amber-400 hover:shadow-md border-amber-400 bg-amber-50 text-emerald-700 font-semibold">
                  {currentLanguage === 'es' ? item.page : item.pageEn}
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden" onClick={() => setIsExpanded(false)} />
      )}
    </div>
  );
};

export default Sidebar;