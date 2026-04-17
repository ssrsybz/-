import React, { useState, useRef, useEffect } from 'react';
import { ImagePlus, Monitor, Star, Sparkles, X, Download, RefreshCw, ZoomIn } from 'lucide-react';
import { GeneratedImage, Platform, AspectRatio } from '../types';

interface PersonalInspirationProps {
  onNavigateToCreation?: (selectedImage: GeneratedImage | null) => void;
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}

const PersonalInspiration: React.FC<PersonalInspirationProps> = ({ onNavigateToCreation, initialPrompt, onPromptConsumed }) => {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.BILIBILI);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImages, setCurrentImages] = useState<GeneratedImage[]>([]);
  const [backupImages, setBackupImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<GeneratedImage | null>(null);
  const [batchCounter, setBatchCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      onPromptConsumed?.();
      const timer = setTimeout(() => {
        generateImagesWithPrompt(initialPrompt);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt]);

  const generateImagesWithPrompt = async (overridePrompt: string) => {
    if (!overridePrompt.trim()) return;

    setIsGenerating(true);

    const selectedPlatformConfig = platforms.find(p => p.key === selectedPlatform);
    const batchIdx = batchCounter + 1;

    const newImages: GeneratedImage[] = ['A', 'B', 'C', 'D'].map((label, index) => ({
      id: `${Date.now()}-${index}`,
      prompt: overridePrompt,
      imageUrl: `https://placehold.co/${selectedPlatformConfig?.width}x${selectedPlatformConfig?.height}/1a1a1a/D4AF37?text=${label}+${selectedPlatformConfig?.label}`,
      platform: selectedPlatform,
      ratio: selectedPlatformConfig?.ratio || AspectRatio.BILIBILI,
      createdAt: new Date(),
      isFavorite: false,
      batchIndex: batchIdx
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    setBatchCounter(batchIdx);
    setCurrentImages(prev => [...newImages, ...prev]);
    setIsGenerating(false);

    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const platforms = [
    { key: Platform.BILIBILI, label: 'B站', ratio: AspectRatio.BILIBILI, width: 640, height: 360 },
    { key: Platform.DOUYIN, label: '抖音', ratio: AspectRatio.DOUYIN, width: 360, height: 640 },
    { key: Platform.XIAOHONGSHU, label: '小红书', ratio: AspectRatio.XIAOHONGSHU, width: 480, height: 640 },
    { key: Platform.GONGZHONGHAO, label: '公众号', ratio: AspectRatio.GONGZHONGHAO, width: 640, height: 360 },
    { key: Platform.CUSTOM, label: '其他比例', ratio: AspectRatio.CUSTOM, width: 500, height: 500 }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReferenceImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateImages = async () => {
    if (!prompt.trim()) {
      alert('请输入创意描述');
      return;
    }
    generateImagesWithPrompt(prompt);
  };

  const toggleFavorite = (imageId: string) => {
    const image = currentImages.find(img => img.id === imageId);
    if (!image) return;

    const willBeFavorite = !image.isFavorite;

    setCurrentImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, isFavorite: willBeFavorite } : img
      )
    );

    if (willBeFavorite) {
      if (backupImages.length < 4) {
        setBackupImages(prev => [...prev, { ...image, isFavorite: true }]);
      }
    } else {
      setBackupImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const selectImage = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  const regenerate = () => {
    generateImages();
  };

  const getPlatformColor = (platform: Platform) => {
    const colors = {
      [Platform.BILIBILI]: 'bg-[#00FFCC]/20 border-[#00FFCC]/30 text-[#00FFCC]',
      [Platform.DOUYIN]: 'bg-[#FE2C55]/20 border-[#FE2C55]/30 text-[#FE2C55]',
      [Platform.XIAOHONGSHU]: 'bg-[#FF2442]/20 border-[#FF2442]/30 text-[#FF2442]',
      [Platform.GONGZHONGHAO]: 'bg-[#0055ff]/20 border-[#0055ff]/30 text-[#0055ff]',
      [Platform.CUSTOM]: 'bg-white/10 border-white/20 text-white/70'
    };
    return colors[platform];
  };

  const getAspectClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case AspectRatio.BILIBILI:
      case AspectRatio.GONGZHONGHAO: return 'aspect-video';
      case AspectRatio.DOUYIN: return 'aspect-[9/16]';
      case AspectRatio.XIAOHONGSHU: return 'aspect-[3/4]';
      case AspectRatio.CUSTOM: return 'aspect-square';
      default: return 'aspect-video';
    }
  };

  const ImageCard: React.FC<{ image: GeneratedImage, isBackup?: boolean }> = ({ image, isBackup = false }) => (
    <div
      className={`relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${
        selectedImageId === image.id
          ? 'ring-2 ring-[#D4AF37] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
          : 'border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]'
      }`}
      onClick={() => selectImage(image.id)}
    >
      <div className={getAspectClass(image.ratio)}>
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Zoom button */}
      <button
        className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white/50 hover:text-[#D4AF37] hover:bg-black/80 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          setZoomedImage(image);
        }}
      >
        <ZoomIn size={14} />
      </button>
      {/* Favorite button */}
      <button
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300 ${
          image.isFavorite
            ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.5)]'
            : 'bg-black/60 backdrop-blur-sm text-white/50 hover:text-[#D4AF37]'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(image.id);
        }}
      >
        <Star size={14} fill={image.isFavorite ? 'currentColor' : 'none'} />
      </button>
      {!isBackup && (
        <div className={`absolute bottom-2 left-2 px-2 py-1 text-[10px] rounded-lg border ${getPlatformColor(image.platform)}`}>
          {platforms.find(p => p.key === image.platform)?.label}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex gap-4 p-4 overflow-hidden bg-[#050505]">
      <div className="w-[35%] bg-gradient-to-br from-[#0055ff]/5 to-[#8800ff]/5 rounded-2xl border border-[#8800ff]/20 flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/80">创意描述:</h3>
          <button className="text-[10px] px-3 py-1.5 bg-[#8800ff]/20 text-white rounded-lg border border-[#8800ff]/30 hover:shadow-[0_0_15px_rgba(136,0,255,0.2)] transition-all duration-300">
            建立主体库
          </button>
        </div>
        
        <div className="relative mb-4">
          <textarea 
            placeholder="用一句话描述你的节目创意、或直接粘贴你的创意文稿"
            className="w-full h-48 p-4 pb-16 text-sm bg-[#0d0d0d] border border-white/5 rounded-xl resize-none focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] text-white placeholder-white/20 transition-all duration-300"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {referenceImage ? (
            <div className="absolute bottom-4 left-4">
              <div className="relative">
                <img 
                  src={referenceImage} 
                  alt="参考图"
                  className="w-12 h-12 object-cover rounded-lg border border-[#D4AF37]/30"
                />
                <button 
                  onClick={handleRemoveReferenceImage}
                  className="absolute -top-1 -right-1 p-0.5 bg-[#0d0d0d] rounded-full shadow-lg hover:bg-[#1a1a1a] transition-colors border border-white/10"
                >
                  <X size={10} className="text-white/60" />
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="absolute bottom-4 left-4 p-2 border border-dashed border-white/20 rounded-lg text-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 bg-[#0d0d0d]"
              onClick={() => fileInputRef.current?.click()}
              title="上传参考图"
            >
              <ImagePlus size={18} />
            </button>
          )}
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
            选择平台/比例 <Monitor size={14} className="text-[#D4AF37]" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map((item) => (
              <button 
                key={item.key}
                onClick={() => setSelectedPlatform(item.key)}
                className={`px-4 py-2 text-xs rounded-lg transition-all duration-300 ${
                  selectedPlatform === item.key 
                    ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_15px_rgba(136,0,255,0.3)]' 
                    : 'border border-white/10 text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/30">
            比例: {platforms.find(p => p.key === selectedPlatform)?.ratio}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <button 
            onClick={generateImages}
            disabled={isGenerating || !prompt.trim()}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              isGenerating || !prompt.trim()
                ? 'bg-[#1a1a1a] border border-white/5 text-white/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#F9D976] to-[#B38728] text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-[1.02]'
            }`}
          >
            {isGenerating ? (
              <>
                <span className="relative flex h-[18px] w-[18px]">
                  <span className="absolute inset-0 rounded-full bg-[#D4AF37]/40 animate-[ping_1.5s_ease-in-out_infinite]" />
                  <span className="absolute inset-[3px] rounded-full bg-[#D4AF37]/60 animate-[ping_1.5s_ease-in-out_0.4s_infinite]" />
                  <span className="relative inline-flex h-[18px] w-[18px] rounded-full bg-gradient-to-r from-[#F9D976] to-[#B38728]" />
                </span>
                AI 创作中...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                开始创作
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden min-h-0">
        <div className="flex-1 bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-white/50 truncate">
              {currentImages.length > 0 ? `创意描述：${currentImages[0].prompt}` : '创意描述：'}
            </h3>
            <div className="flex gap-2">
              {currentImages.length > 0 && (
                <>
                  <button
                    onClick={regenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <RefreshCw size={12} />
                    重新生成
                  </button>
                  <button className="px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                    重新编辑
                  </button>
                </>
              )}
            </div>
          </div>
          
          {currentImages.length > 0 ? (
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {[...new Set(currentImages.map(img => img.batchIndex))].sort((a, b) => (b ?? 0) - (a ?? 0)).map((batchIdx) => {
                const batchImages = currentImages.filter(img => img.batchIndex === batchIdx);
                return (
                  <div key={batchIdx} className="bg-[#1a1a1a]/60 rounded-2xl border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white text-[10px] px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(136,0,255,0.3)]">
                        生成 {batchIdx}
                      </span>
                      <span className="text-[10px] text-white/30">{platforms.find(p => p.key === batchImages[0]?.platform)?.ratio}</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {batchImages.map((image) => (
                        <div key={image.id} className="flex-shrink-0 w-[22%] min-w-[140px]">
                          <ImageCard image={image} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
              <div className="text-center text-white/30">
                <Sparkles size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">输入创意描述后开始创作</p>
              </div>
            </div>
          )}
        </div>

        <div className="h-[30%] flex-shrink-0 bg-gradient-to-br from-[#0055ff]/5 to-[#8800ff]/5 border border-[#8800ff]/20 rounded-2xl p-4 flex flex-col relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-semibold text-white/70">封面备选库 ({backupImages.length}/4)</h3>
            <span className="text-[10px] text-white/30">*收藏图片将自动加入备选库，最多可选4张</span>
          </div>

          {backupImages.length > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 flex-1 overflow-y-auto">
                {backupImages.map((image) => (
                  <ImageCard key={image.id} image={image} isBackup />
                ))}
              </div>
              {selectedImageId && (
                <button
                  onClick={() => {
                    const selectedImage = backupImages.find(img => img.id === selectedImageId) || currentImages.find(img => img.id === selectedImageId) || null;
                    onNavigateToCreation?.(selectedImage);
                  }}
                  className="absolute bottom-6 right-6 px-6 py-2.5 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-sm font-semibold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center gap-2"
                >
                  <Download size={14} />
                  选好了，去调整
                </button>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
              在上方图片中点击星标收藏，即可加入备选库
            </div>
          )}
        </div>
      </div>

      <div className="w-16 border border-white/5 rounded-2xl bg-[#0d0d0d]/90 backdrop-blur-xl p-2 flex flex-col gap-2 overflow-y-auto hidden lg:flex">
         <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[8px] text-white/20 text-center">小图预览</div>
         {backupImages.slice(0, 6).map((image) => (
           <div 
             key={image.id}
             className={`w-full aspect-square rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden ${
               selectedImageId === image.id 
                 ? 'ring-2 ring-[#D4AF37] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                 : 'border-white/5 hover:border-[#D4AF37]/50'
             }`}
             onClick={() => selectImage(image.id)}
           >
             <img 
               src={image.imageUrl} 
               alt=""
               className="w-full h-full object-cover"
               loading="lazy"
             />
           </div>
         ))}
         {backupImages.length === 0 && (
           <>
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-full aspect-square bg-[#1a1a1a] rounded-lg border border-white/5"></div>
             ))}
           </>
         )}
      </div>

      {/* Lightbox modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={zoomedImage.imageUrl}
              alt={zoomedImage.prompt}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            />
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInspiration;
