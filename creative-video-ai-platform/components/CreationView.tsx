import React from 'react';
import { PlusCircle, Layout, Image, Type, ImageIcon, Palette, Wand2, User, Users, Search, Camera, Settings, Square, Layers, Expand } from 'lucide-react';

interface CreationViewProps {
  backgroundImage?: string | null;
}

const CreationView: React.FC<CreationViewProps> = ({ backgroundImage }) => {
  return (
    <div className="flex-1 flex overflow-hidden bg-[#050505]">
      <div className="w-20 border-r border-white/5 bg-[#0d0d0d]/90 backdrop-blur-xl flex flex-col py-4 gap-4 items-center shrink-0">
        {[
          { icon: <PlusCircle size={20} />, label: '添加' },
          { icon: <Layout size={20} />, label: '模板' },
          { icon: <ImageIcon size={20} />, label: '素材' },
          { icon: <Type size={20} />, label: '文字' },
          { icon: <Image size={20} />, label: '图片' },
          { icon: <Palette size={20} />, label: '背景' },
          { icon: <Wand2 size={20} />, label: 'AI工具' },
          { icon: <User size={20} />, label: '我的' },
          { icon: <Users size={20} />, label: '团队' },
        ].map((tool, i) => (
          <button key={i} className="flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group text-white/50 hover:text-white/80 hover:bg-white/5">
            <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
              {tool.icon}
            </div>
            <span className="text-[10px] mt-1.5 font-medium transition-all duration-300">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      <div className="w-64 border-r border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl flex flex-col p-4 shrink-0">
        <div className="relative mb-4">
          <input type="text" placeholder="搜索模板" className="w-full pl-8 pr-8 py-2 text-xs bg-[#1a1a1a] border border-white/5 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.15)] placeholder-white/20 transition-all duration-300" />
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30" />
          <Camera size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30" />
        </div>

        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1.5 bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white rounded-lg text-[10px] font-medium shadow-[0_0_15px_rgba(136,0,255,0.3)]">推荐模板</button>
          <button className="px-3 py-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-[10px] transition-all duration-300">分类 ▾</button>
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 custom-scrollbar">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden group cursor-pointer hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300">
              <img src={`https://picsum.photos/seed/temp${i}/150/200`} alt="template" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-[#0a0a0a] flex flex-col relative overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl aspect-video bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden border border-white/5">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                className="w-full h-full object-cover"
                alt="canvas content"
              />
            ) : (
              <img
                src="https://picsum.photos/seed/editing/1280/720"
                className="w-full h-full object-cover"
                alt="canvas content"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-5 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-full border border-white/5 text-xs text-white/50">
           <span>第 1/1 页</span>
           <div className="w-px h-3 bg-white/10"></div>
           <button className="hover:text-white transition-colors duration-300">80% ▾</button>
           <button className="hover:text-[#D4AF37] transition-colors duration-300"><Expand size={14}/></button>
        </div>
      </div>

      <div className="w-72 bg-[#0d0d0d]/80 backdrop-blur-xl border-l border-white/5 p-6 flex flex-col gap-8 shrink-0">
        <div>
          <h3 className="text-sm font-bold mb-4 text-white">画板</h3>
          <div className="flex gap-4 text-white/40">
             <Settings size={16} className="cursor-pointer hover:text-[#D4AF37] transition-colors duration-300" />
             <Square size={16} className="cursor-pointer hover:text-[#D4AF37] transition-colors duration-300" />
             <Layers size={16} className="cursor-pointer hover:text-[#D4AF37] transition-colors duration-300" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs text-white/50">尺寸</h4>
            <span className="text-[10px] text-white/30">1600 × 1000 px</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 border border-white/10 rounded-lg text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] text-white/60 transition-all duration-300">调整尺寸</button>
            <button className="flex-1 py-2 border border-white/10 rounded-lg text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] text-white/60 transition-all duration-300">尺寸延展</button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs text-white/50">背景图</h4>
          <div className="flex gap-2">
            <button className="flex-1 py-2 border border-white/10 rounded-lg text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] text-white/60 transition-all duration-300">上传图片</button>
            <button className="flex-1 py-2 border border-white/10 rounded-lg text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] text-white/60 transition-all duration-300">背景库</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h4 className="text-xs text-white/50">背景色</h4>
             <div className="w-4 h-4 rounded-full border border-white/10 bg-[#1a1a1a]"></div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] text-white/30">
                <span>不透明度</span>
                <span>100</span>
             </div>
             <input type="range" className="w-full h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationView;
