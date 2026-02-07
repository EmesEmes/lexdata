import { useState, useEffect, useRef } from "react";
import { Home, Menu, MessageSquare, X, Globe } from "lucide-react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const mobileMenuRef = useRef(null);

  const menuItems = [
    { id: "home", href: "/", icon: Home, label: "HOME", labelEs: "INICIO" },
    {
      id: "chat",
      href: "https://api.whatsapp.com/send/?phone=593980285306&text=%C2%A1Hola%21+Estoy+visitando+su+sitio+web+y+deseo+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0",
      icon: MessageSquare,
      label: "CHAT",
      labelEs: "CHAT",
    },
  ];

  const submenuItems = [
    {
      page: "BIENES RAICES O INMOBILIARIO",
      pageEn: "REAL ESTATE",
      href: "/bienes-raices-inmobiliario",
    },
    {
      page: "PODERES",
      pageEn: "POWERS OF ATTORNEY",
      href: "/poderes",
    },
    {
      page: "SOCIETARIO",
      pageEn: "CORPORATE",
      href: "/societario",
    },
    {
      page: "SALIDAS MENORES",
      pageEn: "MINOR EXIT PERMITS",
      href: "/salida-de-menores",
    },
    {
      page: "ESCRITURAS ELECTRÓNICAS",
      pageEn: "ELECTRONIC DEEDS",
      href: "/escrituras-electronicas",
    },
  ];

  // Detectar idioma actual por URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setCurrentLanguage(path.startsWith("/en") ? "en" : "es");
    }
  }, []);

  // Establecer ítem activo basado en URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;

      for (const item of menuItems) {
        const localizedHref = getLocalizedHref(item);
        if (path === localizedHref) {
          setActiveItem(item.id);
          break;
        }
      }
    }
  }, [currentLanguage]);

  const toggleLanguage = () => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      let newPath;

      if (currentLanguage === "es") {
        newPath = "/en" + currentPath;
        setCurrentLanguage("en");
      } else {
        newPath = currentPath.replace("/en", "") || "/";
        setCurrentLanguage("es");
      }

      window.location.href = newPath;
    }
  };

  const getLocalizedHref = (item) => {
    if (item.href.startsWith("http://") || item.href.startsWith("https://")) {
      return item.href;
    }
    return currentLanguage === "en" ? "/en" + item.href : item.href;
  };

  // Cierre del menú móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-secondary-background shadow-lg z-50 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href={currentLanguage === "es" ? "/" : "/en"}>
                <img
                  src="/lexdata-logo.svg"
                  alt="logo lexdata"
                  className="h-40 w-40"
                />
              </a>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const displayLabel =
                  currentLanguage === "es" ? item.labelEs : item.label;
                const localizedHref = getLocalizedHref(item);

                let isActive = activeItem === item.id;
                if (typeof window !== "undefined") {
                  const path = window.location.pathname;
                  if (!item.href.startsWith("http") && path === localizedHref) {
                    isActive = true;
                  }
                }

                return (
                  <a href={localizedHref} key={item.id}>
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-stone-300`}
                    >
                      <Icon size={20} />
                      <span className="text-2xl">{displayLabel}</span>
                    </button>
                  </a>
                );
              })}

              {/* Dropdown Services */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-stone-300">
                  <Menu size={20} />
                  <span className="text-2xl">
                    {currentLanguage === "es" ? "SERVICIOS" : "SERVICES"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-80 bg-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-4 space-y-2">
                    {submenuItems.map((item, index) => (
                      <a
                        href={
                          currentLanguage === "es"
                            ? item.href
                            : "/en" + item.href
                        }
                        key={index}
                      >
                        <button className="w-full text-left p-3 rounded-lg border-2 transition-all duration-200 hover:border-amber-400 hover:shadow-md border-amber-400 bg-amber-50 text-emerald-700 font-semibold text-sm">
                          {currentLanguage === "es" ? item.page : item.pageEn}
                        </button>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-stone-300">
                <Globe size={20} />
                <span className="text-2xl">
                  {currentLanguage === "es" ? "TELEMATICOS" : "SERVICES"}
                </span>
              </button>
            </div>

            {/* Language Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-stone-300 transition-colors"
                title={
                  currentLanguage === "es"
                    ? "Cambiar a inglés"
                    : "Switch to Spanish"
                }
              >
                <span className="text-2xl">
                  {currentLanguage === "es" ? "🇪🇸" : "🇺🇸"}
                </span>
                <span className="hidden sm:inline text-xs text-stone-600 font-medium">
                  {currentLanguage === "es" ? "ESP" : "ENG"}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-stone-300 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-16 left-0 right-0 bg-secondary-background shadow-lg z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-3">
          {/* Mobile Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const displayLabel =
              currentLanguage === "es" ? item.labelEs : item.label;
            const localizedHref = getLocalizedHref(item);

            return (
              <a href={localizedHref} key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-stone-300 transition-colors"
                >
                  <Icon size={20} className="text-stone-600" />
                  <span className="text-sm font-medium text-stone-600">
                    {displayLabel}
                  </span>
                </button>
              </a>
            );
          })}

          {/* Mobile Submenu Items */}
          <div className="border-t border-stone-300 pt-3 mt-3">
            <p className="px-4 py-2 text-xs font-semibold text-stone-500 uppercase">
              {currentLanguage === "es" ? "Servicios" : "Services"}
            </p>
            {submenuItems.map((item, index) => (
              <a
                href={currentLanguage === "es" ? item.href : "/en" + item.href}
                key={index}
              >
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors text-sm text-stone-700"
                >
                  {currentLanguage === "es" ? item.page : item.pageEn}
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          style={{ top: "64px" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Spacer para evitar que el contenido quede debajo del navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
