import React from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      <div className="relative bg-[#0d0d0d]/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">设置</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-all duration-300 group"
          >
            <X size={20} className="text-white/40 group-hover:text-[#D4AF37] transition-colors duration-300" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-4">主题模式</h3>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (theme !== 'light') toggleTheme();
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border transition-all duration-300 ${
                  theme === 'light'
                    ? 'border-[#D4AF37] bg-gradient-to-br from-[#F9D976]/10 to-[#B38728]/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
                }`}
              >
                <Sun size={22} className={`${theme === 'light' ? 'text-[#D4AF37]' : 'text-white/40'}`} />
                <span className={`font-medium ${theme === 'light' ? 'text-[#D4AF37]' : 'text-white/50'}`}>浅色模式</span>
              </button>
              <button
                onClick={() => {
                  if (theme !== 'dark') toggleTheme();
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-[#8800ff] bg-gradient-to-br from-[#0055ff]/10 to-[#8800ff]/10 shadow-[0_0_20px_rgba(136,0,255,0.3)]'
                    : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
                }`}
              >
                <Moon size={22} className={`${theme === 'dark' ? 'text-[#8800ff]' : 'text-white/40'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#8800ff]' : 'text-white/50'}`}>深色模式</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <button 
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#1a1a1a] hover:bg-[#222] rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
