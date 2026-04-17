import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Plus, Share2, Copy, Check, ClipboardList, Loader2, TrendingUp, ChevronDown, ChevronUp, Crown, Users, BarChart3, Shield, Award } from 'lucide-react';
import { CoverItem, TitleOption, CTRReport, CTRReportItem, CTRViewStep, CTRReportTab } from '../types';
import { TEST_CHANNELS, TESTER_COUNT_OPTIONS, TEST_GROUPS, COVER_COLORS, INDUSTRY_BENCHMARKS, CONFIDENCE_LEVELS, MOCK_COVER_IMAGES, MOCK_TITLES, CHANNEL_CTR_PATTERNS, COVER_PERFORMANCE_MULTIPLIERS, GROUP_CTR_BIAS, GROUP_WEIGHTS } from '../constants';

const CTRView: React.FC = () => {
  const [step, setStep] = useState<CTRViewStep>('config');
  const [covers, setCovers] = useState<CoverItem[]>([]);
  const [titles, setTitles] = useState<TitleOption[]>([{ id: '1', text: '' }]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTesterCount, setSelectedTesterCount] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [report, setReport] = useState<CTRReport | null>(null);
  const [activeChannelFilter, setActiveChannelFilter] = useState<string>('all');
  const [expandedCover, setExpandedCover] = useState<string | null>(null);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showTesterModal, setShowTesterModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<CTRReportTab>(CTRReportTab.OVERVIEW);
  const [audienceCategory, setAudienceCategory] = useState<'age' | 'gender' | 'interest'>('age');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newCovers: CoverItem[] = [];
    const remaining = 4 - covers.length;
    const filesToProcess = Array.from(files).slice(0, remaining);
    filesToProcess.forEach((file, i) => {
      const labelIndex = covers.length + i;
      if (labelIndex < 4) {
        newCovers.push({
          id: `cover_${Date.now()}_${i}`,
          label: COVER_COLORS[labelIndex].label,
          imageUrl: URL.createObjectURL(file),
          file,
        });
      }
    });
    setCovers(prev => [...prev, ...newCovers]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveCover = (id: string) => {
    setCovers(prev => {
      const removed = prev.filter(c => c.id !== id);
      return removed.map((c, i) => ({
        ...c,
        label: COVER_COLORS[i].label,
      }));
    });
  };

  const handleAddTitle = () => {
    if (titles.length >= 4) return;
    setTitles(prev => [...prev, { id: `title_${Date.now()}`, text: '' }]);
  };

  const handleUpdateTitle = (id: string, text: string) => {
    setTitles(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  const handleRemoveTitle = (id: string) => {
    setTitles(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleToggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleGenerateShareLink = () => {
    const link = `https://topcover.ai/test/${Date.now().toString(36)}`;
    setShareLink(link);
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateMockReport = (): CTRReport => {
    const items: CTRReportItem[] = [];
    
    const effectiveCovers = covers.length > 0 
      ? covers
      : COVER_COLORS.slice(0, 4).map((c, i) => ({
          id: `preset_${i}`,
          label: c.label,
          imageUrl: MOCK_COVER_IMAGES[i % MOCK_COVER_IMAGES.length],
        }));
    
    const effectiveTitles = titles.filter(t => t.text.trim()).length > 0
      ? titles.filter(t => t.text.trim())
      : [
          { id: 'title_1', text: MOCK_TITLES[0] },
          { id: 'title_2', text: MOCK_TITLES[1] },
        ];
    
    const channels = selectedChannels.length > 0
      ? TEST_CHANNELS.filter(c => selectedChannels.includes(c.id))
      : TEST_CHANNELS;

    const activeGroups = selectedGroups.length > 0
      ? TEST_GROUPS.filter(g => selectedGroups.includes(g.id))
      : TEST_GROUPS;

    const testerCount = selectedTesterCount || 25000;

    effectiveCovers.forEach((cover, coverIndex) => {
      effectiveTitles.forEach((title) => {
        channels.forEach(channel => {
          const pattern = CHANNEL_CTR_PATTERNS[channel.id] || { baseCtr: 10, variance: 5 };
          const coverMultiplier = COVER_PERFORMANCE_MULTIPLIERS[coverIndex] || 1.0;
          
          let baseImpressions = testerCount / channels.length / effectiveTitles.length;
          
          if (activeGroups.length > 0) {
            activeGroups.forEach(group => {
              const weight = GROUP_WEIGHTS[group.id] || 0.2;
              const groupBias = GROUP_CTR_BIAS[group.id] || 1.0;
              
              const impressions = Math.floor(baseImpressions * weight * (0.8 + Math.random() * 0.4));
              const varianceFactor = (Math.random() - 0.5) * 2 * pattern.variance;
              const ctr = Math.max(1, Math.round((pattern.baseCtr * coverMultiplier * groupBias + varianceFactor) * 100) / 100);
              const clicks = Math.floor(impressions * ctr / 100);
              
              items.push({
                coverId: cover.id,
                coverLabel: cover.label,
                coverImageUrl: cover.imageUrl,
                titleId: title.id,
                titleText: title.text,
                channelId: channel.id,
                channelName: channel.name,
                impressions,
                clicks,
                ctr,
                groupId: group.id,
                groupName: group.name,
              });
            });
          } else {
            const impressions = Math.floor(baseImpressions * (0.8 + Math.random() * 0.4));
            const varianceFactor = (Math.random() - 0.5) * 2 * pattern.variance;
            const ctr = Math.max(1, Math.round((pattern.baseCtr * coverMultiplier + varianceFactor) * 100) / 100);
            const clicks = Math.floor(impressions * ctr / 100);
            
            items.push({
              coverId: cover.id,
              coverLabel: cover.label,
              coverImageUrl: cover.imageUrl,
              titleId: title.id,
              titleText: title.text,
              channelId: channel.id,
              channelName: channel.name,
              impressions,
              clicks,
              ctr,
            });
          }
        });
      });
    });

    return {
      id: `report_${Date.now()}`,
      items,
      totalTesters: testerCount,
      createdAt: new Date(),
      status: 'completed',
      shareLink,
    };
  };

  const handleGenerateReport = () => {
    setStep('testing');
    setTimeout(() => {
      const mockReport = generateMockReport();
      setReport(mockReport);
      setStep('report');
    }, 5000);
  };

  const getFilteredItems = (): CTRReportItem[] => {
    if (!report) return [];
    if (activeChannelFilter === 'all') return report.items;
    return report.items.filter(item => item.channelId === activeChannelFilter);
  };

  const getCoverAggregatedData = () => {
    const items = getFilteredItems().filter(item => !item.groupId);
    const coverMap = new Map<string, { label: string; imageUrl: string; totalImpressions: number; totalClicks: number; ctr: number }>();
    items.forEach(item => {
      const existing = coverMap.get(item.coverId);
      if (existing) {
        existing.totalImpressions += item.impressions;
        existing.totalClicks += item.clicks;
        existing.ctr = existing.totalImpressions > 0 ? Math.round(existing.totalClicks / existing.totalImpressions * 10000) / 100 : 0;
      } else {
        coverMap.set(item.coverId, {
          label: item.coverLabel,
          imageUrl: item.coverImageUrl,
          totalImpressions: item.impressions,
          totalClicks: item.clicks,
          ctr: item.ctr,
        });
      }
    });

    if (coverMap.size === 0) {
      const allItems = getFilteredItems();
      allItems.forEach(item => {
        const existing = coverMap.get(item.coverId);
        if (existing) {
          existing.totalImpressions += item.impressions;
          existing.totalClicks += item.clicks;
          existing.ctr = existing.totalImpressions > 0 ? Math.round(existing.totalClicks / existing.totalImpressions * 10000) / 100 : 0;
        } else {
          coverMap.set(item.coverId, {
            label: item.coverLabel,
            imageUrl: item.coverImageUrl,
            totalImpressions: item.impressions,
            totalClicks: item.clicks,
            ctr: item.ctr,
          });
        }
      });
    }

    return Array.from(coverMap.entries()).map(([id, data]) => ({ id, ...data }));
  };

  const getBestCoverId = () => {
    const data = getCoverAggregatedData();
    if (data.length === 0) return null;
    return data.reduce((best, curr) => curr.ctr > best.ctr ? curr : best).id;
  };

  const getCoverDetailItems = (coverId: string) => {
    if (!report) return [];
    return report.items.filter(item => item.coverId === coverId && !item.groupId);
  };

  const getOptimizationSuggestion = () => {
    const data = getCoverAggregatedData();
    if (data.length === 0) return '';
    const best = data.reduce((b, c) => c.ctr > b.ctr ? c : b);
    if (best.ctr > 15) return `方案${best.label}表现优异，建议优先采用`;
    if (best.ctr >= 10) return `方案${best.label}表现尚可，建议优化标题文案`;
    return '所有方案点击率偏低，建议重新设计封面';
  };

  const getCoverColorIndex = (label: string) => {
    return COVER_COLORS.findIndex(c => c.label === label);
  };

  const getIndustryBenchmark = (): number => {
    if (!report) return 0;
    if (activeChannelFilter === 'all') {
      const activeChannelIds = selectedChannels.length > 0
        ? selectedChannels
        : report.items.map(item => item.channelId);
      const uniqueChannelIds = [...new Set(activeChannelIds)];
      if (uniqueChannelIds.length === 0) return 0;
      const sum = uniqueChannelIds.reduce((acc, id) => acc + (INDUSTRY_BENCHMARKS[id] || 0), 0);
      return Math.round(sum / uniqueChannelIds.length * 100) / 100;
    }
    return INDUSTRY_BENCHMARKS[activeChannelFilter] || 0;
  };

  const getConfidenceLevel = (totalTesters: number) => {
    return CONFIDENCE_LEVELS.find(level => totalTesters >= level.minTesters) || CONFIDENCE_LEVELS[CONFIDENCE_LEVELS.length - 1];
  };

  const getConfidenceMargin = (): number => {
    if (!report) return 0;
    const bestData = getCoverAggregatedData();
    if (bestData.length === 0) return 0;
    const best = bestData.reduce((b, c) => c.ctr > b.ctr ? c : b);
    const p = best.ctr / 100;
    const n = report.totalTesters;
    if (n === 0) return 0;
    const margin = 1.96 * Math.sqrt(p * (1 - p) / n) * 100;
    return Math.round(margin * 100) / 100;
  };

  const renderChannelModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowChannelModal(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-[360px] max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-bold text-white">选择测试渠道</h3>
          <button onClick={() => setShowChannelModal(false)} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="space-y-2">
          {TEST_CHANNELS.map(channel => (
            <button
              key={channel.id}
              onClick={() => handleToggleChannel(channel.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                selectedChannels.includes(channel.id)
                  ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10'
                  : 'border-white/5 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: channel.color }} />
              <span className="text-sm text-white/80">{channel.name}</span>
              {selectedChannels.includes(channel.id) && <Check size={16} className="ml-auto text-[#D4AF37]" />}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowChannelModal(false)}
          className="w-full mt-5 py-2.5 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-sm font-bold text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
        >
          确认
        </button>
      </div>
    </div>
  );

  const renderTesterModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowTesterModal(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-[360px]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-bold text-white">选择测试人数</h3>
          <button onClick={() => setShowTesterModal(false)} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="space-y-2">
          {TESTER_COUNT_OPTIONS.map(option => {
            const isRecommended = option.value === 10000 || option.value === 20000;
            return (
              <button
                key={option.value}
                onClick={() => { setSelectedTesterCount(option.value); setShowTesterModal(false); }}
                className={`w-full flex items-center px-4 py-3 rounded-xl border transition-all duration-300 ${
                  selectedTesterCount === option.value
                    ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10'
                    : 'border-white/5 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <span className="text-sm text-white/80">{option.label}</span>
                <span className={`ml-2 text-[10px] ${isRecommended ? 'text-[#D4AF37]' : 'text-white/30'}`}>{option.recommend}</span>
                {selectedTesterCount === option.value && <Check size={16} className="ml-auto text-[#D4AF37]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGroupModal = () => {
    const categories = [
      { key: 'age' as const, label: '年龄段' },
      { key: 'gender' as const, label: '性别' },
      { key: 'interest' as const, label: '兴趣偏好' },
    ];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowGroupModal(false)}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-[360px] max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-bold text-white">选择测试群体</h3>
            <button onClick={() => setShowGroupModal(false)} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          <div className="space-y-5">
            {categories.map(cat => (
              <div key={cat.key}>
                <h4 className="text-xs text-white/40 mb-2 font-medium">{cat.label}</h4>
                <div className="space-y-2">
                  {TEST_GROUPS.filter(g => g.category === cat.key).map(group => (
                    <button
                      key={group.id}
                      onClick={() => handleToggleGroup(group.id)}
                      className={`w-full flex items-center px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                        selectedGroups.includes(group.id)
                          ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10'
                          : 'border-white/5 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-sm text-white/80">{group.name}</span>
                      {selectedGroups.includes(group.id) && <Check size={16} className="ml-auto text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowGroupModal(false)}
            className="w-full mt-5 py-2.5 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-sm font-bold text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            确认
          </button>
        </div>
      </div>
    );
  };

  const renderLeftPanel = () => (
    <div className="w-[400px] bg-[#0d0d0d]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col gap-5 shrink-0 overflow-y-auto">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white">封面库</h3>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#0055ff]/20 to-[#8800ff]/20 text-[#00FFCC] rounded-lg text-[10px] border border-[#00FFCC]/30 hover:shadow-[0_0_15px_rgba(0,255,204,0.2)] transition-all duration-300"
          >
            <Upload size={12} />
            上传自定义封面
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {COVER_COLORS.map((color, index) => {
            const cover = covers[index];
            return (
              <div
                key={color.label}
                className={`relative aspect-square bg-gradient-to-br ${color.bg} border ${color.border} rounded-xl flex items-center justify-center ${color.hoverBorder} ${color.hoverShadow} transition-all duration-300 cursor-pointer overflow-hidden group`}
              >
                {cover ? (
                  <>
                    <img src={cover.imageUrl} alt={`封面${color.label}`} className="w-full h-full object-cover" />
                    <span className={`absolute bottom-1.5 left-1.5 text-[10px] font-bold ${color.text} bg-black/50 px-1.5 py-0.5 rounded`}>{color.label}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveCover(cover.id); }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/80"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </>
                ) : (
                  <span className={`text-xl font-bold ${color.text} opacity-30`}>{color.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-3">标题</h3>
        <div className="space-y-2">
          {titles.map((title, index) => (
            <div key={title.id} className="flex items-center gap-2">
              <input
                type="text"
                value={title.text}
                onChange={e => handleUpdateTitle(title.id, e.target.value)}
                placeholder={`标题 ${index + 1}`}
                className="flex-1 px-3 py-2 text-xs bg-[#1a1a1a] border border-white/5 rounded-lg focus:outline-none focus:border-[#D4AF37]/50 focus:shadow-[0_0_10px_rgba(212,175,55,0.15)] placeholder-white/20 text-white transition-all duration-300"
              />
              {titles.length > 1 && (
                <button
                  onClick={() => handleRemoveTitle(title.id)}
                  className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          {titles.length < 4 && (
            <button
              onClick={handleAddTitle}
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-white/10 rounded-lg text-xs text-white/30 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]/60 transition-all duration-300"
            >
              <Plus size={14} />
              添加标题
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-3">测试参数</h3>
        <div className="space-y-2">
          <button
            onClick={() => setShowChannelModal(true)}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-white/10 rounded-xl text-xs text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            <span>选择测试渠道</span>
            <span className="text-white/30">{selectedChannels.length > 0 ? `已选${selectedChannels.length}个渠道` : '未选择'}</span>
          </button>
          <button
            onClick={() => setShowTesterModal(true)}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-white/10 rounded-xl text-xs text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            <span>选择测试人数</span>
            <span className="text-white/30">{selectedTesterCount > 0 ? TESTER_COUNT_OPTIONS.find(o => o.value === selectedTesterCount)?.label : '未选择'}</span>
          </button>
          <button
            onClick={() => setShowGroupModal(true)}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-white/10 rounded-xl text-xs text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            <span>选择测试群体</span>
            <span className="text-white/30">{selectedGroups.length > 0 ? `已选${selectedGroups.length}组` : '未选择'}</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-3">分享测试链接</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={handleGenerateShareLink}
              className="flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-lg text-xs text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              <Share2 size={14} />
              生成链接
            </button>
            {shareLink && (
              <div className="flex-1 flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border border-white/5 rounded-lg">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-[10px] text-white/40 focus:outline-none min-w-0"
                />
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 text-white/30 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            )}
          </div>
          {shareLink && (
            <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-white/5 rounded-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(shareLink)}&bgcolor=1a1a1a&color=ffffff`}
                alt="测试链接二维码"
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/40 mb-1">扫描二维码分享测试入口</p>
                <p className="text-[9px] text-white/20 truncate">{shareLink}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleGenerateReport}
          className="w-full py-3.5 bg-gradient-to-r from-[#F9D976] to-[#B38728] rounded-xl text-sm font-bold text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-all duration-300"
        >
          生成点击率报告
        </button>
      </div>
    </div>
  );

  const renderConfigState = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <ClipboardList size={48} className="text-white/10" />
      <p className="text-white/30 text-sm">配置测试参数后，点击生成报告</p>
    </div>
  );

  const renderTestingState = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 flex items-center justify-center">
          <Loader2 size={28} className="text-[#D4AF37] animate-spin" />
        </div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-[#D4AF37]/60 animate-spin" style={{ animationDuration: '1.5s' }} />
      </div>
      <p className="text-white/40 text-sm">正在收集测试数据，请稍候...</p>
    </div>
  );

  const renderOverviewTab = () => {
    const aggregated = getCoverAggregatedData();
    const bestId = getBestCoverId();
    const maxCtr = aggregated.length > 0 ? Math.max(...aggregated.map(d => d.ctr)) : 0;
    const suggestion = getOptimizationSuggestion();
    const benchmark = getIndustryBenchmark();
    const confidenceLevel = report ? getConfidenceLevel(report.totalTesters) : CONFIDENCE_LEVELS[2];
    const confidenceMargin = getConfidenceMargin();
    const bestData = aggregated.length > 0 ? aggregated.reduce((b, c) => c.ctr > b.ctr ? c : b) : null;

    return (
      <>
        {report && bestData && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-4 shrink-0 ${confidenceLevel.bgColor} ${confidenceLevel.borderColor} bg-opacity-50`}
            style={{ borderLeftWidth: '3px', borderLeftColor: confidenceLevel.color === 'text-green-400' ? '#4ade80' : confidenceLevel.color === 'text-yellow-400' ? '#facc15' : '#f87171' }}
          >
            <Shield size={18} className={confidenceLevel.color} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[11px] font-bold ${confidenceLevel.color}`}>{confidenceLevel.label}</span>
                <span className="text-[10px] text-white/30">·</span>
                <span className="text-[10px] text-white/40">测试样本 {report.totalTesters.toLocaleString()} 人</span>
              </div>
              <span className="text-[11px] text-white/60">
                最优方案点击率 {bestData.ctr}% ± {confidenceMargin}%
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-5 shrink-0 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveChannelFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 whitespace-nowrap ${
              activeChannelFilter === 'all'
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            全部
          </button>
          {TEST_CHANNELS.filter(c => selectedChannels.includes(c.id) || report?.items.some(item => item.channelId === c.id)).map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannelFilter(channel.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 whitespace-nowrap ${
                activeChannelFilter === channel.id
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channel.color }} />
              {channel.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {aggregated.map(data => {
            const colorIndex = getCoverColorIndex(data.label);
            const color = COVER_COLORS[colorIndex] || COVER_COLORS[0];
            const isBest = data.id === bestId;
            const isExpanded = expandedCover === data.id;
            const barWidth = maxCtr > 0 ? (data.ctr / maxCtr) * 100 : 0;
            const benchmarkPosition = maxCtr > 0 && benchmark > 0 ? (benchmark / maxCtr) * 100 : 0;
            const diffFromBenchmark = benchmark > 0 ? Math.round((data.ctr - benchmark) * 100) / 100 : 0;
            const isAboveBenchmark = diffFromBenchmark > 0;

            return (
              <div key={data.id} className="bg-[#0d0d0d]/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedCover(isExpanded ? null : data.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${color.bg} border ${color.border} rounded-lg flex items-center justify-center shrink-0`}>
                    <span className={`text-sm font-bold ${color.text}`}>{data.label}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-white/60 truncate">
                        {titles.find(t => t.text.trim())?.text || `方案 ${data.label}`}
                      </span>
                      {isBest && (
                        <span className="shrink-0 px-1.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-[9px] font-bold text-[#D4AF37] flex items-center gap-0.5">
                          <TrendingUp size={10} />
                          最优
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-5 bg-white/[0.03] rounded-full overflow-hidden relative">
                        <div
                          className={`h-full bg-gradient-to-r ${color.bg.replace('/10', '/60').replace('/5', '/40')} rounded-full transition-all duration-700`}
                          style={{ width: `${barWidth}%` }}
                        />
                        {benchmark > 0 && benchmarkPosition > 0 && benchmarkPosition <= 100 && (
                          <div
                            className="absolute top-0 bottom-0 border-l border-dashed border-white/60"
                            style={{ left: `${benchmarkPosition}%` }}
                          />
                        )}
                      </div>
                      <span className={`text-sm font-bold ${color.text} shrink-0 w-14 text-right`}>{data.ctr}%</span>
                    </div>
                    {benchmark > 0 && (
                      <div className="mt-1">
                        <span className={`text-[10px] ${isAboveBenchmark ? 'text-green-400' : 'text-red-400'}`}>
                          {isAboveBenchmark ? '↑' : '↓'} {isAboveBenchmark ? '高于' : '低于'}行业均值 {Math.abs(diffFromBenchmark)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-white/20">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/5">
                    <table className="w-full mt-3">
                      <thead>
                        <tr className="text-[10px] text-white/30">
                          <th className="text-left pb-2 font-medium">渠道</th>
                          <th className="text-right pb-2 font-medium">展示量</th>
                          <th className="text-right pb-2 font-medium">点击量</th>
                          <th className="text-right pb-2 font-medium">点击率</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCoverDetailItems(data.id).map((item, i) => (
                          <tr key={i} className="text-[11px] text-white/50">
                            <td className="py-1.5">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TEST_CHANNELS.find(c => c.id === item.channelId)?.color }} />
                                {item.channelName}
                              </div>
                            </td>
                            <td className="text-right py-1.5">{item.impressions.toLocaleString()}</td>
                            <td className="text-right py-1.5">{item.clicks.toLocaleString()}</td>
                            <td className="text-right py-1.5 text-white/70 font-medium">{item.ctr}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}

          {suggestion && (
            <div className="bg-gradient-to-r from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/10 rounded-xl p-4 flex items-start gap-3">
              <TrendingUp size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#D4AF37] mb-1">优化建议</h4>
                <p className="text-xs text-white/50">{suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderChannelCompareTab = () => {
    if (!report) return null;

    const activeChannelIds = selectedChannels.length > 0
      ? selectedChannels
      : [...new Set(report.items.map(item => item.channelId))];
    const activeChannels = TEST_CHANNELS.filter(c => activeChannelIds.includes(c.id));
    const activeCovers = covers.length > 0 ? covers : [];

    const matrixData: Record<string, Record<string, number>> = {};
    const coverLabels: Record<string, string> = {};

    activeCovers.forEach(cover => {
      matrixData[cover.id] = {};
      coverLabels[cover.id] = cover.label;
      activeChannels.forEach(channel => {
        const channelItems = report.items.filter(
          item => item.coverId === cover.id && item.channelId === channel.id && !item.groupId
        );
        if (channelItems.length > 0) {
          const totalImpressions = channelItems.reduce((sum, item) => sum + item.impressions, 0);
          const totalClicks = channelItems.reduce((sum, item) => sum + item.clicks, 0);
          matrixData[cover.id][channel.id] = totalImpressions > 0
            ? Math.round(totalClicks / totalImpressions * 10000) / 100
            : 0;
        } else {
          const allChannelItems = report.items.filter(
            item => item.coverId === cover.id && item.channelId === channel.id
          );
          if (allChannelItems.length > 0) {
            const totalImpressions = allChannelItems.reduce((sum, item) => sum + item.impressions, 0);
            const totalClicks = allChannelItems.reduce((sum, item) => sum + item.clicks, 0);
            matrixData[cover.id][channel.id] = totalImpressions > 0
              ? Math.round(totalClicks / totalImpressions * 10000) / 100
              : 0;
          } else {
            matrixData[cover.id][channel.id] = 0;
          }
        }
      });
    });

    const allCtrValues = Object.values(matrixData).flatMap(channelMap => Object.values(channelMap));
    const maxCtrValue = Math.max(...allCtrValues, 1);
    const minCtrValue = Math.min(...allCtrValues, 0);

    const channelBests: Record<string, { coverId: string; ctr: number }> = {};
    activeChannels.forEach(channel => {
      let bestCoverId = '';
      let bestCtr = 0;
      activeCovers.forEach(cover => {
        const ctr = matrixData[cover.id]?.[channel.id] || 0;
        if (ctr > bestCtr) {
          bestCtr = ctr;
          bestCoverId = cover.id;
        }
      });
      channelBests[channel.id] = { coverId: bestCoverId, ctr: bestCtr };
    });

    return (
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="overflow-x-auto mb-5">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left text-[10px] text-white/30 font-medium pb-3 pr-3 w-20"></th>
                {activeChannels.map(channel => (
                  <th key={channel.id} className="text-center text-[10px] font-medium pb-3 px-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: channel.color }} />
                      <span className="text-white/50">{channel.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeCovers.map(cover => {
                const colorIndex = getCoverColorIndex(coverLabels[cover.id]);
                const color = COVER_COLORS[colorIndex] || COVER_COLORS[0];
                return (
                  <tr key={cover.id}>
                    <td className="pr-3 py-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${color.bg} border ${color.border} rounded-lg flex items-center justify-center`}>
                        <span className={`text-xs font-bold ${color.text}`}>{coverLabels[cover.id]}</span>
                      </div>
                    </td>
                    {activeChannels.map(channel => {
                      const ctr = matrixData[cover.id]?.[channel.id] || 0;
                      const isBest = channelBests[channel.id]?.coverId === cover.id;
                      const intensity = maxCtrValue > minCtrValue
                        ? (ctr - minCtrValue) / (maxCtrValue - minCtrValue)
                        : 0;
                      const bgColor = `rgba(212, 175, 55, ${intensity * 0.15})`;

                      return (
                        <td key={channel.id} className="py-2 px-2 text-center">
                          <div
                            className={`relative flex items-center justify-center py-2.5 px-2 rounded-lg ${isBest ? 'border border-[#D4AF37]/50' : 'border border-transparent'}`}
                            style={{ backgroundColor: bgColor }}
                          >
                            <span className="text-[11px] text-white/70 font-medium">{ctr}%</span>
                            {isBest && (
                              <Crown size={10} className="absolute -top-1 -right-1 text-[#D4AF37]" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {activeChannels.map(channel => {
            const best = channelBests[channel.id];
            const bestLabel = best ? coverLabels[best.coverId] : '-';
            const bestColorIndex = best ? getCoverColorIndex(bestLabel) : 0;
            const bestColor = COVER_COLORS[bestColorIndex] || COVER_COLORS[0];
            return (
              <div
                key={channel.id}
                className="shrink-0 bg-[#0d0d0d]/60 backdrop-blur-sm border border-white/5 rounded-xl p-3 min-w-[140px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-[11px] text-white/60 font-medium">{channel.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 bg-gradient-to-br ${bestColor.bg} border ${bestColor.border} rounded flex items-center justify-center`}>
                    <span className={`text-[9px] font-bold ${bestColor.text}`}>{bestLabel}</span>
                  </div>
                  <span className="text-sm font-bold text-white/80">{best?.ctr || 0}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAudienceTab = () => {
    if (!report) return null;

    const categoryLabels = [
      { key: 'age' as const, label: '年龄段' },
      { key: 'gender' as const, label: '性别' },
      { key: 'interest' as const, label: '兴趣偏好' },
    ];

    const groups = TEST_GROUPS.filter(g => g.category === audienceCategory);

    const getGroupData = (groupId: string) => {
      const groupItems = report.items.filter(item => item.groupId === groupId);
      const coverMap = new Map<string, { label: string; ctr: number; impressions: number; clicks: number }>();

      groupItems.forEach(item => {
        const existing = coverMap.get(item.coverId);
        if (existing) {
          existing.impressions += item.impressions;
          existing.clicks += item.clicks;
          existing.ctr = existing.impressions > 0
            ? Math.round(existing.clicks / existing.impressions * 10000) / 100
            : 0;
        } else {
          coverMap.set(item.coverId, {
            label: item.coverLabel,
            ctr: item.ctr,
            impressions: item.impressions,
            clicks: item.clicks,
          });
        }
      });

      return Array.from(coverMap.entries()).map(([id, data]) => ({ id, ...data }));
    };

    return (
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex gap-2 mb-5 shrink-0">
          {categoryLabels.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setAudienceCategory(cat.key); setExpandedGroup(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 ${
                audienceCategory === cat.key
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.key === 'age' && <Users size={12} />}
              {cat.key === 'gender' && <Users size={12} />}
              {cat.key === 'interest' && <Users size={12} />}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {groups.map(group => {
            const groupData = getGroupData(group.id);
            const isExpanded = expandedGroup === group.id;
            const maxGroupCtr = groupData.length > 0 ? Math.max(...groupData.map(d => d.ctr)) : 0;
            const bestCover = groupData.length > 0
              ? groupData.reduce((b, c) => c.ctr > b.ctr ? c : b)
              : null;

            return (
              <div key={group.id} className="bg-[#0d0d0d]/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                  className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Users size={14} className="text-white/30" />
                    <span className="text-xs text-white/70 font-medium">{group.name}</span>
                    {bestCover && (
                      <span className="text-[9px] text-[#D4AF37]/60">
                        最优: 方案{bestCover.label} ({bestCover.ctr}%)
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 text-white/20">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-2">
                    {groupData.map(data => {
                      const colorIndex = getCoverColorIndex(data.label);
                      const color = COVER_COLORS[colorIndex] || COVER_COLORS[0];
                      const barWidth = maxGroupCtr > 0 ? (data.ctr / maxGroupCtr) * 100 : 0;
                      const isBest = bestCover && data.id === bestCover.id;

                      return (
                        <div key={data.id} className="flex items-center gap-3">
                          <div className={`w-7 h-7 bg-gradient-to-br ${color.bg} border ${color.border} rounded flex items-center justify-center shrink-0`}>
                            <span className={`text-[10px] font-bold ${color.text}`}>{data.label}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-3.5 bg-white/[0.03] rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${color.bg.replace('/10', '/60').replace('/5', '/40')} rounded-full transition-all duration-500`}
                                  style={{ width: `${barWidth}%` }}
                                />
                              </div>
                              <span className={`text-[11px] font-bold ${color.text} shrink-0 w-12 text-right`}>{data.ctr}%</span>
                            </div>
                          </div>
                          {isBest && (
                            <span className="shrink-0 px-1.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-[8px] font-bold text-[#D4AF37]">
                              最优
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReportState = () => {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="text-sm font-bold text-white">点击率报告</h2>
          <span className="text-[10px] text-white/30">*真人实测点击，数据仅供参考</span>
        </div>

        <div className="flex gap-2 mb-4 shrink-0">
          <button
            onClick={() => setActiveReportTab(CTRReportTab.OVERVIEW)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 ${
              activeReportTab === CTRReportTab.OVERVIEW
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            <Award size={12} />
            总览
          </button>
          <button
            onClick={() => setActiveReportTab(CTRReportTab.CHANNEL_COMPARE)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 ${
              activeReportTab === CTRReportTab.CHANNEL_COMPARE
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            <BarChart3 size={12} />
            渠道对比
          </button>
          <button
            onClick={() => setActiveReportTab(CTRReportTab.AUDIENCE)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 ${
              activeReportTab === CTRReportTab.AUDIENCE
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            <Users size={12} />
            人群分析
          </button>
        </div>

        {activeReportTab === CTRReportTab.OVERVIEW && renderOverviewTab()}
        {activeReportTab === CTRReportTab.CHANNEL_COMPARE && renderChannelCompareTab()}
        {activeReportTab === CTRReportTab.AUDIENCE && renderAudienceTab()}
      </div>
    );
  };

  const renderRightPanel = () => (
    <div className="flex-1 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col overflow-hidden relative">
      {step === 'config' && renderConfigState()}
      {step === 'testing' && renderTestingState()}
      {step === 'report' && renderReportState()}
    </div>
  );

  return (
    <div className="flex-1 flex gap-4 p-6 overflow-hidden bg-[#050505]">
      {renderLeftPanel()}
      {renderRightPanel()}
      {showChannelModal && renderChannelModal()}
      {showTesterModal && renderTesterModal()}
      {showGroupModal && renderGroupModal()}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 backdrop-blur-xl rounded-xl text-xs text-[#D4AF37] font-medium animate-fade-in">
          链接已复制
        </div>
      )}
    </div>
  );
};

export default CTRView;
