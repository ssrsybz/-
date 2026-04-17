import React, { useState } from 'react';
import { AppView, WorkspaceTab, SidebarItem } from './types';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PersonalInspiration from './components/PersonalInspiration';
import InspirationLibrary from './components/InspirationLibrary';
import HotReproduction from './components/HotReproduction';
import CreationView from './components/CreationView';
import ExportView from './components/ExportView';
import CTRView from './components/CTRView';
import AnimatedBackground from './components/AnimatedBackground';

const AppContent: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(WorkspaceTab.INSPIRATION);
  const [sidebarItem, setSidebarItem] = useState<SidebarItem>(SidebarItem.PERSONAL_INSPIRATION);
  const [homePrompt, setHomePrompt] = useState('');
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleNavigateToCreation = () => {
    setActiveTab(WorkspaceTab.CREATION);
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setActiveTab(WorkspaceTab.CREATION);
  };

  const handleStartCreation = () => {
    if (homePrompt.trim()) {
      setPendingPrompt(homePrompt.trim());
    }
    setView(AppView.WORKSPACE);
    setActiveTab(WorkspaceTab.INSPIRATION);
  };

  const handleLogoClick = () => {
    setView(AppView.HOME);
  };

  if (view === AppView.HOME) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col p-10 relative">
        <AnimatedBackground />
        
        <div className="relative z-10 flex items-center justify-between mb-20">
          <img 
            src="/LOGO/zhijian_logo.png" 
            alt="指尖封面" 
            className="h-10" 
          />
        </div>

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-20">
          <div className="w-full max-w-2xl bg-gradient-to-br from-[#0055ff]/5 to-[#8800ff]/5 p-12 rounded-3xl border border-[#8800ff]/20 flex flex-col items-center backdrop-blur-xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-3">
                TopCover 指尖封面 AI 助手
              </h1>
              <p className="text-xl text-white/60">
                -- 动动手指，让你的视频封面，脱颖而出。
              </p>
            </div>
            <div className="w-full border-2 border-dashed border-white/10 rounded-2xl p-10 mb-10 bg-[#0d0d0d]/80 backdrop-blur-sm">
              <textarea
                placeholder="用一句话描述你的节目创意、或直接粘贴你的创意文稿，AI 将结合大数据为你推荐最优封面方案"
                className="w-full text-center text-lg bg-transparent border-none focus:outline-none placeholder-white/30 resize-none text-white"
                rows={3}
                value={homePrompt}
                onChange={(e) => setHomePrompt(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleStartCreation}
              className="px-12 py-4 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-lg font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-[1.02] transition-all duration-300"
            >
              开始创作
            </button>
          </div>
        </main>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case WorkspaceTab.INSPIRATION:
        return (
          <div className="flex-1 flex overflow-hidden">
            <Sidebar activeItem={sidebarItem} setActiveItem={setSidebarItem} />
            <div className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
              {sidebarItem === SidebarItem.PERSONAL_INSPIRATION && <PersonalInspiration onNavigateToCreation={handleNavigateToCreation} initialPrompt={pendingPrompt} onPromptConsumed={() => setPendingPrompt(null)} />}
              {sidebarItem === SidebarItem.INSPIRATION_LIBRARY && <InspirationLibrary />}
              {sidebarItem === SidebarItem.HOT_REPRODUCTION && <HotReproduction onSelectImage={handleSelectImage} />}
            </div>
          </div>
        );
      case WorkspaceTab.CREATION:
        return <CreationView backgroundImage={selectedImage} />;
      case WorkspaceTab.EXPORT:
        return <ExportView />;
      case WorkspaceTab.CTR:
        return <CTRView />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#050505]">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onHomeClick={handleLogoClick}
      />
      {renderTabContent()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
