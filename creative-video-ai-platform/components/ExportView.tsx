import React, { useState, useCallback } from 'react';
import { Layout, Layers, Expand, Monitor, RefreshCw, Check, Package, X, ZoomIn } from 'lucide-react';
import { ExportSubTab } from '../types';

interface PlatformConfig {
  key: string;
  label: string;
  ratio: string;
  aspectClass: string;
}

const PLATFORM_CONFIGS: PlatformConfig[] = [
  { key: 'bilibili', label: 'B站', ratio: '16:9', aspectClass: 'aspect-video' },
  { key: 'douyin', label: '抖音', ratio: '9:16', aspectClass: 'aspect-[9/16]' },
  { key: 'xiaohongshu', label: '小红书', ratio: '3:4', aspectClass: 'aspect-[3/4]' },
  { key: 'gongzhonghao', label: '公众号', ratio: '16:9', aspectClass: 'aspect-video' },
  { key: 'custom', label: '其他比例', ratio: '1:1', aspectClass: 'aspect-square' },
];

interface GeneratedCover {
  id: string;
  label: string;
  platformKey: string;
  ratio: string;
  aspectClass: string;
  selected: boolean;
}

interface CoverBatch {
  id: string;
  platformKey: string;
  platformLabel: string;
  ratio: string;
  covers: GeneratedCover[];
}

const ExportView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<ExportSubTab>(ExportSubTab.NORMAL);

  // Cross-platform state
  const [selectedPlatform, setSelectedPlatform] = useState<string>('xiaohongshu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [batches, setBatches] = useState<CoverBatch[]>([]);
  const [previewCover, setPreviewCover] = useState<GeneratedCover | null>(null);

  const currentPlatform = PLATFORM_CONFIGS.find(p => p.key === selectedPlatform)!;

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 1500));

    const batchId = `${Date.now()}`;
    const labels = ['A', 'B', 'C', 'D'];
    const newCovers: GeneratedCover[] = labels.map((label, i) => ({
      id: `${batchId}-${i}`,
      label,
      platformKey: selectedPlatform,
      ratio: currentPlatform.ratio,
      aspectClass: currentPlatform.aspectClass,
      selected: false,
    }));

    const newBatch: CoverBatch = {
      id: batchId,
      platformKey: selectedPlatform,
      platformLabel: currentPlatform.label,
      ratio: currentPlatform.ratio,
      covers: newCovers,
    };

    setBatches(prev => [newBatch, ...prev]);
    setIsGenerating(false);
  };

  const toggleCoverSelection = useCallback((id: string) => {
    setBatches(prev =>
      prev.map(batch => ({
        ...batch,
        covers: batch.covers.map(c =>
          c.id === id ? { ...c, selected: !c.selected } : c
        ),
      }))
    );
  }, []);

  const allCovers = batches.flatMap(b => b.covers);
  const selectedCovers = allCovers.filter(c => c.selected);

  const renderContent = () => {
    switch (activeSubTab) {
      case ExportSubTab.NORMAL:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#050505]">
            <div className="relative w-full max-w-4xl aspect-video bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden border border-white/5">
               <img src="https://picsum.photos/seed/export-normal/1280/720" className="w-full h-full object-cover" alt="export preview" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-white text-5xl font-black drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] uppercase tracking-wide">明天你来上班</div>
               </div>
            </div>
            <div className="mt-8 flex justify-end w-full max-w-4xl">
              <button className="px-10 py-3 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-sm font-bold text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-all duration-300">
                导出封面
              </button>
            </div>
          </div>
        );
      case ExportSubTab.CROSS_PLATFORM:
        return (
          <div className="flex-1 flex gap-4 p-6 overflow-hidden bg-[#050505] relative">
            {/* Left sidebar: source image + platform selector */}
            <div className="w-80 shrink-0 bg-gradient-to-br from-[#0055ff]/5 to-[#8800ff]/5 rounded-2xl border border-[#8800ff]/20 p-6 flex flex-col overflow-y-auto">
              <h4 className="text-xs text-white/40 mb-4 text-center">*一键生成任意平台和比例的同款封面</h4>
              <div className="aspect-video bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden mb-6">
                <img src="https://picsum.photos/seed/export-side/1280/720" className="w-full h-full object-cover" alt="source" />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  选择目标平台 <Monitor size={14} className="text-[#D4AF37]" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_CONFIGS.map(p => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPlatform(p.key)}
                      className={`px-4 py-2 text-xs rounded-lg transition-all duration-300 ${
                        selectedPlatform === p.key
                          ? 'bg-gradient-to-r from-[#0055ff] to-[#8800ff] text-white shadow-[0_0_15px_rgba(136,0,255,0.3)]'
                          : 'border border-white/10 text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/30">
                  比例: {currentPlatform.ratio}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isGenerating
                      ? 'bg-[#1a1a1a] border border-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F9D976] to-[#B38728] text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-[1.02]'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Layers size={18} />
                      一键生成
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right side: batch cards + export library */}
            <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
              {/* Generated batches — scrollable list of horizontal cards */}
              <div className="flex-[2] bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h3 className="text-base font-semibold text-white truncate">
                    生成结果
                  </h3>
                  <div className="flex gap-2">
                    {batches.length > 0 && (
                      <>
                        <button
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                        >
                          <RefreshCw size={12} className={isGenerating ? 'animate-spin' : ''} />
                          重新生成
                        </button>
                        <button className="px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                          重新编辑
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {batches.length > 0 ? (
                  <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="bg-[#1a1a1a]/60 border border-white/5 rounded-xl p-4"
                      >
                        {/* Batch header */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-gradient-to-r from-[#0055ff]/20 to-[#8800ff]/20 text-white/70 border border-[#8800ff]/20">
                            {batch.platformLabel}
                          </span>
                          <span className="text-[11px] text-white/40">{batch.ratio}</span>
                        </div>
                        {/* 4 covers in a row */}
                        <div className="flex gap-3">
                          {batch.covers.map((cover) => (
                            <div
                              key={cover.id}
                              className={`relative flex-1 min-w-0 rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 group ${
                                cover.selected
                                  ? 'ring-2 ring-[#D4AF37] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                  : 'border-white/10 hover:border-[#D4AF37]/50'
                              }`}
                            >
                              {/* Cover with fixed aspect ratio */}
                              <div className={`${cover.aspectClass} w-full bg-gradient-to-br from-[#8800ff]/15 to-[#0055ff]/10 flex items-center justify-center`}>
                                <span className="text-xl font-bold text-white/20">{cover.label}</span>
                              </div>
                              {/* Zoom button — top left */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewCover(cover);
                                }}
                                className="absolute top-2 left-2 w-7 h-7 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                              >
                                <ZoomIn size={14} className="text-white/80" />
                              </button>
                              {/* Select check — top right */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCoverSelection(cover.id);
                                }}
                                className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                  cover.selected
                                    ? 'bg-[#D4AF37] shadow-lg'
                                    : 'bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-black/70'
                                }`}
                              >
                                <Check size={14} className={cover.selected ? 'text-black' : 'text-white/60'} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                    <div className="text-center text-white/30">
                      <Layers size={32} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm">选择目标平台后点击"一键生成"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Export library — only shows selected covers */}
              <div className="h-[28%] shrink-0 bg-gradient-to-br from-[#0055ff]/5 to-[#8800ff]/5 border border-[#8800ff]/20 rounded-2xl p-4 flex flex-col relative">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xs font-semibold text-white/70 flex items-center gap-2">
                      <Package size={14} />
                      导出库 ({selectedCovers.length})
                    </h3>
                    <p className="text-[10px] text-white/30">
                      *点击封面右上角勾选，确定后点击打包导出
                    </p>
                  </div>
                  {selectedCovers.length > 0 && (
                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-xs font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300">
                      打包导出
                    </button>
                  )}
                </div>

                {selectedCovers.length > 0 ? (
                  <div className="flex-1 flex gap-3 overflow-x-auto custom-scrollbar pb-1">
                    {selectedCovers.map((cover) => (
                      <div
                        key={cover.id}
                        className="shrink-0 h-full rounded-lg border border-[#D4AF37]/30 overflow-hidden cursor-pointer transition-all duration-300 ring-1 ring-[#D4AF37]/20 hover:ring-[#D4AF37]/50"
                        style={{ aspectRatio: cover.ratio.replace(':', '/') }}
                        onClick={() => toggleCoverSelection(cover.id)}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-[#8800ff]/15 to-[#0055ff]/10 flex flex-col items-center justify-center gap-1">
                          <span className="text-sm font-bold text-white/20">{cover.label}</span>
                          <span className="text-[9px] text-white/30">
                            {PLATFORM_CONFIGS.find(p => p.key === cover.platformKey)?.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-white/20 text-sm border-2 border-dashed border-white/5 rounded-xl">
                    点击封面右上角勾选，选中的封面将出现在这里
                  </div>
                )}
              </div>
            </div>

            {/* Full-screen preview overlay */}
            {previewCover && (
              <div
                className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
                onClick={() => setPreviewCover(null)}
              >
                <div
                  className="relative max-w-[80%] max-h-[80%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                  style={{ aspectRatio: previewCover.ratio.replace(':', '/') }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-full min-w-[300px] min-h-[200px] bg-gradient-to-br from-[#8800ff]/20 to-[#0055ff]/15 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/15">{previewCover.label}</span>
                  </div>
                  {/* Close button */}
                  <button
                    onClick={() => setPreviewCover(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X size={20} className="text-white/80" />
                  </button>
                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/70">
                        {PLATFORM_CONFIGS.find(p => p.key === previewCover.platformKey)?.label} · {previewCover.ratio}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCoverSelection(previewCover.id);
                          // Update preview cover to reflect new state
                          setPreviewCover({ ...previewCover, selected: !previewCover.selected });
                        }}
                        className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                          previewCover.selected
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {previewCover.selected ? '取消选中' : '加入导出库'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case ExportSubTab.PREVIEW:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#050505]">
            <img
              src="/inspiration/客户.png"
              alt="客户预览"
              className="w-full h-full max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#050505]">
      <div className="w-20 border-r border-white/5 bg-[#0d0d0d]/90 backdrop-blur-xl flex flex-col py-4 gap-4 items-center shrink-0">
        <button 
          onClick={() => setActiveSubTab(ExportSubTab.NORMAL)}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group ${
            activeSubTab === ExportSubTab.NORMAL 
              ? 'border border-[#D4AF37] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <div className={`transition-all duration-300 ${
            activeSubTab === ExportSubTab.NORMAL 
              ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            <Layout size={20} />
          </div>
          <span className={`text-[10px] mt-1.5 font-medium transition-all duration-300 ${
            activeSubTab === ExportSubTab.NORMAL 
              ? 'text-[#D4AF37]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            常规导出
          </span>
        </button>
        <button 
          onClick={() => setActiveSubTab(ExportSubTab.CROSS_PLATFORM)}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group ${
            activeSubTab === ExportSubTab.CROSS_PLATFORM 
              ? 'border border-[#D4AF37] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <div className={`transition-all duration-300 ${
            activeSubTab === ExportSubTab.CROSS_PLATFORM 
              ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            <Layers size={20} />
          </div>
          <span className={`text-[10px] mt-1.5 font-medium transition-all duration-300 ${
            activeSubTab === ExportSubTab.CROSS_PLATFORM 
              ? 'text-[#D4AF37]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            一键跨平台
          </span>
        </button>
        <button 
          onClick={() => setActiveSubTab(ExportSubTab.PREVIEW)}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group ${
            activeSubTab === ExportSubTab.PREVIEW 
              ? 'border border-[#D4AF37] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <div className={`transition-all duration-300 ${
            activeSubTab === ExportSubTab.PREVIEW 
              ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            <Expand size={20} />
          </div>
          <span className={`text-[10px] mt-1.5 font-medium transition-all duration-300 ${
            activeSubTab === ExportSubTab.PREVIEW 
              ? 'text-[#D4AF37]' 
              : 'text-white/50 group-hover:text-white/80'
          }`}>
            客户预览
          </span>
        </button>
      </div>

      <main className="flex-1 flex overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default ExportView;
