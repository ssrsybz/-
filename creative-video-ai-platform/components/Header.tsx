import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { WorkspaceTab } from '../types';
import SettingsModal from './SettingsModal';

interface HeaderProps {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onHomeClick }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <img
          src="/LOGO/zhijian_logo.png"
          alt="指尖封面"
          onClick={onHomeClick}
          className="h-10 cursor-pointer group-hover:opacity-80 transition-opacity"
        />
        
        <nav className="flex items-center bg-[#1a1a1a] rounded-xl p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab(WorkspaceTab.INSPIRATION)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${
              activeTab === WorkspaceTab.INSPIRATION 
                ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_20px_rgba(136,0,255,0.3)]' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            灵感
          </button>
          <button 
            onClick={() => setActiveTab(WorkspaceTab.CREATION)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${
              activeTab === WorkspaceTab.CREATION 
                ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_20px_rgba(136,0,255,0.3)]' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            创作
          </button>
          <button 
            onClick={() => setActiveTab(WorkspaceTab.EXPORT)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${
              activeTab === WorkspaceTab.EXPORT 
                ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_20px_rgba(136,0,255,0.3)]' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            导出
          </button>
          <button 
            onClick={() => setActiveTab(WorkspaceTab.CTR)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${
              activeTab === WorkspaceTab.CTR 
                ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_20px_rgba(136,0,255,0.3)]' 
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            点击率预测
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:border-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300">
          教程
        </button>
        <button className="px-5 py-2 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:border-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300">
          我的
        </button>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2.5 border border-white/10 rounded-lg hover:border-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300 group"
          title="设置"
        >
          <Settings size={18} className="text-white/60 group-hover:text-[#D4AF37] transition-colors duration-300" />
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </header>
  );
};

export default Header;
