import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2, Wifi, WifiOff, ExternalLink, Eye, Clock, User } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  danmaku: string;
  duration: string;
  author: string;
  url: string;
  keyword: string;
  collectedAt: number;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface HotReproductionProps {
  onSelectImage?: (imageUrl: string) => void;
}

const HotReproduction: React.FC<HotReproductionProps> = ({ onSelectImage }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // WebSocket 连接管理
  const connectWS = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    setConnectionStatus('connecting');

    try {
      const ws = new WebSocket('ws://localhost:3001/ws');

      ws.onopen = () => {
        console.log('[热点复刻] WebSocket 已连接');
        setConnectionStatus('connected');
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'searchResults' && Array.isArray(msg.data)) {
            console.log('[热点复刻] 收到搜索结果:', msg.data.length, '条');
            setResults(msg.data);
            setIsSearching(false);
          }
        } catch (e) {
          console.error('[热点复刻] 解析消息失败:', e);
        }
      };

      ws.onclose = () => {
        console.log('[热点复刻] WebSocket 断开');
        setConnectionStatus('disconnected');
        wsRef.current = null;
        // 自动重连
        reconnectTimer.current = setTimeout(connectWS, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };

      wsRef.current = ws;
    } catch (e) {
      setConnectionStatus('disconnected');
      reconnectTimer.current = setTimeout(connectWS, 3000);
    }
  }, []);

  useEffect(() => {
    connectWS();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connectWS]);

  // 发送搜索请求
  const handleSearch = () => {
    const keyword = searchKeyword.trim();
    if (!keyword) return;

    setIsSearching(true);
    setResults([]);
    setCurrentKeyword(keyword);

    // 通过 WebSocket 发送搜索请求
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'search', keyword }));
    } else {
      // 降级为 REST API
      fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      }).catch(e => console.error('[热点复刻] 发送搜索请求失败:', e));
    }

    // 打开B站搜索页面（让插件 content script 能运行并轮询）
    window.open(`https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`, '_blank');
  };

  // 回车搜索
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // 连接状态指示器
  const StatusBadge = () => {
    const config = {
      connected: { color: 'text-green-400', icon: <Wifi size={12} />, text: '已连接' },
      connecting: { color: 'text-yellow-400', icon: <Loader2 size={12} className="animate-spin" />, text: '连接中' },
      disconnected: { color: 'text-red-400', icon: <WifiOff size={12} />, text: '未连接' },
    }[connectionStatus];

    return (
      <span className={`flex items-center gap-1.5 text-xs ${config.color}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-[#050505]">
      {/* 搜索栏 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入关键词搜索B站热门视频，自动采集封面和数据"
            className="w-full pl-6 pr-14 py-4 bg-[#1a1a1a] border border-white/5 rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] text-white placeholder-white/20 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchKeyword.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-[#0055ff] to-[#8800ff] rounded-xl hover:shadow-[0_0_15px_rgba(136,0,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? <Loader2 size={20} className="text-white animate-spin" /> : <Search size={20} className="text-white" />}
          </button>
        </div>
        <StatusBadge />
      </div>

      {/* 状态提示 */}
      {isSearching && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-[#0055ff]/10 border border-[#0055ff]/20 rounded-xl">
          <Loader2 size={16} className="text-[#0055ff] animate-spin" />
          <span className="text-sm text-[#0055ff]/80">
            正在B站搜索 "<span className="text-white font-medium">{currentKeyword}</span>" 并采集数据，请稍候...
          </span>
        </div>
      )}

      {connectionStatus === 'disconnected' && !isSearching && results.length === 0 && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <WifiOff size={16} className="text-yellow-400" />
          <span className="text-sm text-yellow-400/80">
            API 服务器未连接。请先运行 <code className="bg-black/30 px-2 py-0.5 rounded text-yellow-300">cd server && npm start</code> 启动服务器。
          </span>
        </div>
      )}

      {/* 搜索结果 */}
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        {results.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/40">
                搜索 "<span className="text-[#D4AF37]">{currentKeyword}</span>" 共 {results.length} 个结果
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {results.map((video) => (
                <div key={video.id} className="group cursor-pointer" onClick={() => {
                  const src = video.thumbnail.startsWith('/images/') ? `http://localhost:3001${video.thumbnail}` : video.thumbnail;
                  if (onSelectImage) {
                    onSelectImage(src);
                  } else {
                    window.open(video.url, '_blank');
                  }
                }}>
                  <div className="relative aspect-video bg-[#1a1a1a] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500">
                    <img
                      src={video.thumbnail.startsWith('/images/') ? `http://localhost:3001${video.thumbnail}` : video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-white text-[10px] font-medium drop-shadow-md">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye size={10} /> {video.views}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Clock size={10} /> {video.duration}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-white/90 line-clamp-2 mb-2 leading-relaxed group-hover:text-[#D4AF37] transition-colors duration-300">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <User size={10} />
                    <span>{video.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : !isSearching && (
          /* 空状态 */
          <div className="flex flex-col items-center justify-center h-full text-white/20">
            <Search size={48} className="mb-4 opacity-30" />
            <p className="text-lg mb-2">搜索B站热门视频</p>
            <p className="text-sm text-white/10">输入关键词，插件将自动在B站搜索并采集数据</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotReproduction;
