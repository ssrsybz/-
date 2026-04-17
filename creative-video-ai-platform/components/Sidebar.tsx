import React from 'react';
import { SidebarItem } from '../types';
import { SIDEBAR_LINKS } from '../constants';

interface SidebarProps {
  activeItem: SidebarItem;
  setActiveItem: (item: SidebarItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  return (
    <aside className="w-20 border-r border-white/5 bg-[#0d0d0d]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 shrink-0">
      {SIDEBAR_LINKS.map((link) => (
        <button
          key={link.id}
          onClick={() => setActiveItem(link.id as SidebarItem)}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group ${
            activeItem === link.id 
              ? 'border border-[#D4AF37] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <div className={`transition-all duration-300 ${
            activeItem === link.id 
              ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            {link.icon}
          </div>
          <span className={`text-[10px] mt-1.5 font-medium transition-all duration-300 ${
            activeItem === link.id 
              ? 'text-[#D4AF37]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            {link.label}
          </span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
