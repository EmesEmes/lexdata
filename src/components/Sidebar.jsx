import React, { useState } from 'react';
import { Home, Menu, MessageSquare, Phone, Globe } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'home', href: '/', icon: Home, label: 'HOME', labelEs: 'INICIO' },
    { id: 'menu', icon: Menu, label: 'MENU', labelEs: 'MENÚ' },
    { id: 'chat', href: '/chat',icon: MessageSquare, label: 'CHAT', labelEs: 'CHAT' },
    { id: 'contact', href: '/contact', icon: Phone, label: 'CONTACT', labelEs: 'CONTACTO' }
  ];

  const submenuItems = [
    'BIENES RAÍCES O INMOBILIARIO',
    'PODERES',
    'SOCIETARIO',
    'SALIDAS MENORES',
    'ESCRITURAS ELECTRÓNICAS'
  ];

  return (
    <div className="flex">
      {/* Sidebar principal */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-20 bg-secondary-background shadow-lg z-50 flex flex-col rounded-lg">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-stone-300">
          <div className="w-10 h-10 flex items-center justify-center shadow-sm">
            <img src="/favicon.svg" alt="icono lexdata" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <a href={`${item.href}`} key={item.id}>
                <button
                
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.id === 'menu') {
                    setIsExpanded(!isExpanded);
                  } else {
                    setIsExpanded(false);
                  }
                }}
                className={`w-full h-16 flex flex-col items-center justify-center transition-all duration-200 hover:bg-stone-300 ${
                  isActive ? 'bg-emerald-100 border-r-2 border-emerald-600' : ''
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mb-1 ${
                    isActive ? 'text-emerald-600' : 'text-stone-600'
                  }`} 
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-emerald-600' : 'text-stone-600'
                }`}>
                  {item.label}
                </span>
              </button>
              </a>
            );
          })}
        </div>

        {/* Language Toggle */}
        <div className="border-t border-stone-300 p-2">
          <div className="flex flex-col space-y-2">
            <button className="flex items-center justify-center p-2 rounded hover:bg-stone-300 transition-colors">
              <div className="w-6 h-4 bg-red-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-yellow-400"></div>
                </div>
              </div>
            </button>
            <span className="text-xs text-stone-600 text-center">ESP</span>
          </div>
        </div>
      </div>

      {/* Submenu expandido */}
      <div className={`fixed left-20 top-1/2 -translate-y-1/2 bg-secondary-background shadow-lg transition-all duration-300 z-40 ${
        isExpanded ? 'w-80' : 'w-0'
      } overflow-hidden`}>
        <div className="p-6 ">
          <div className="space-y-3">
            {submenuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:border-amber-400 hover:shadow-md ${
                  item === 'SALIDAS MENORES' 
                    ? 'border-amber-400 bg-amber-50 text-emerald-700 font-semibold' 
                    : 'border-amber-200 bg-stone-50 text-stone-700 hover:bg-amber-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

            

      {/* Overlay para cerrar menú en móvil */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;