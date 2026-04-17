import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Copy, Star, Leaf, Play } from 'lucide-react';

type StyleType = 'hot' | 'big_text' | 'classic_up' | 'pure_image' | 'info' | 'movie_poster' | 'other';

interface StyleOption {
  id: StyleType;
  name: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  glowColor: string;
  imagePath: string;
}

const InspirationLibrary: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('hot');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedStyle = localStorage.getItem('selectedStyle') as StyleType;
    if (savedStyle) {
      setSelectedStyle(savedStyle);
    }
  }, []);

  const handleStyleChange = (styleId: StyleType) => {
    setIsAnimating(true);
    setSelectedStyle(styleId);
    localStorage.setItem('selectedStyle', styleId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const styles: StyleOption[] = [
    {
      id: 'hot',
      name: '热门',
      icon: <Flame size={20} />,
      gradientFrom: '#F9D976',
      gradientTo: '#B38728',
      borderColor: 'border-[#D4AF37]',
      glowColor: 'rgba(212,175,55,0.3)',
      imagePath: '/inspiration/whiteboard_exported_image.png'
    },
    {
      id: 'big_text',
      name: '大字报型',
      icon: <Copy size={20} />,
      gradientFrom: '#0055ff',
      gradientTo: '#8800ff',
      borderColor: 'border-[#8800ff]',
      glowColor: 'rgba(136,0,255,0.3)',
      imagePath: '/components/图片/大字报型.png'
    },
    {
      id: 'classic_up',
      name: '经典UP主型',
      icon: <Star size={20} />,
      gradientFrom: '#8800ff',
      gradientTo: '#0055ff',
      borderColor: 'border-[#8800ff]',
      glowColor: 'rgba(136,0,255,0.3)',
      imagePath: '/components/图片/经典up主.png'
    },
    {
      id: 'pure_image',
      name: '纯享画面型',
      icon: <Leaf size={20} />,
      gradientFrom: '#00FFCC',
      gradientTo: '#00aa88',
      borderColor: 'border-[#00FFCC]',
      glowColor: 'rgba(0,255,204,0.3)',
      imagePath: '/components/图片/纯享画面.png'
    },
    {
      id: 'info',
      name: '干货信息型',
      icon: <Play size={20} />,
      gradientFrom: '#FF6B6B',
      gradientTo: '#ee5a5a',
      borderColor: 'border-[#FF6B6B]',
      glowColor: 'rgba(255,107,107,0.3)',
      imagePath: '/components/图片/干货信息.png'
    },
    {
      id: 'movie_poster',
      name: '电影海报型',
      icon: <Sparkles size={20} />,
      gradientFrom: '#F9D976',
      gradientTo: '#B38728',
      borderColor: 'border-[#D4AF37]',
      glowColor: 'rgba(212,175,55,0.3)',
      imagePath: '/components/图片/电影海报.png'
    },
    {
      id: 'other',
      name: '其他',
      icon: <Sparkles size={20} />,
      gradientFrom: '#666',
      gradientTo: '#444',
      borderColor: 'border-white/20',
      glowColor: 'rgba(255,255,255,0.1)',
      imagePath: '/components/图片/其他.png'
    }
  ];

  const selectedStyleData = styles.find(s => s.id === selectedStyle);

  return (
    <div className="flex-1 flex gap-4 p-4 overflow-hidden bg-[#050505]">
      <div className="flex-1 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-white">挑选风格，一键复刻</h2>
          </div>
          <h3 className="text-sm font-semibold text-white/50">风格预览</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleChange(style.id)}
                className={`flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 min-w-[100px] group ${
                  selectedStyle === style.id
                    ? `${style.borderColor} shadow-lg`
                    : 'border-white/10 bg-[#1a1a1a] hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                }`}
                style={selectedStyle === style.id ? {
                  background: `linear-gradient(135deg, ${style.gradientFrom}20, ${style.gradientTo}20)`,
                  boxShadow: `0 0 25px ${style.glowColor}`
                } : {}}
              >
                <div className={`transition-all duration-300 ${
                  selectedStyle === style.id ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                }`}
                style={selectedStyle === style.id ? {
                  filter: `drop-shadow(0 0 8px ${style.glowColor})`
                } : {}}
                >
                  {style.icon}
                </div>
                <span className={`font-medium text-sm transition-all duration-300 ${
                  selectedStyle === style.id ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                }`}>
                  {style.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden mt-4">
          {selectedStyle ? (
            <>
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="relative w-full flex items-center justify-center">
                  <img 
                    src={selectedStyleData?.imagePath}
                    alt="风格预览"
                    className={`w-full h-auto object-contain rounded-2xl transition-all duration-500 ${
                      isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    style={{
                      filter: `drop-shadow(0 0 30px ${selectedStyleData?.glowColor})`
                    }}
                  />
                  <div 
                    className={`absolute top-4 right-4 px-4 py-2 rounded-xl border font-semibold text-sm transition-all duration-500 ${
                      isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${selectedStyleData?.gradientFrom}30, ${selectedStyleData?.gradientTo}30)`,
                      borderColor: selectedStyleData?.borderColor.replace('border-', ''),
                      color: selectedStyleData?.gradientFrom,
                      boxShadow: `0 0 15px ${selectedStyleData?.glowColor}`
                    }}
                  >
                    {selectedStyleData?.name}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
              <div className="text-center text-white/40">
                <p className="text-lg font-medium mb-2">请选择一个风格</p>
                <p className="text-sm">从上方选择你喜欢的封面风格，然后点击一键复刻</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspirationLibrary;
