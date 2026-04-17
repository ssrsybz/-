
import React from 'react';
import { VideoTrend, TestChannel, TestGroup, CTRReportTab } from './types';
import { Sparkles, Library, Zap } from 'lucide-react';

export const SIDEBAR_LINKS = [
  { id: 'personal_inspiration', label: '个性灵感', icon: <Sparkles size={20} /> },
  { id: 'inspiration_library', label: '灵感库', icon: <Library size={20} /> },
  { id: 'hot_reproduction', label: '热点复刻', icon: <Zap size={20} /> },
];

export const VIDEO_TRENDS: VideoTrend[] = [
  {
    id: '1',
    title: '"AI: 有视频有真相！意大利面就拌42号混凝土（完整版）"',
    author: '一朵五颜六色的白云',
    date: '2024-07-13',
    views: '954.8万',
    comments: '6062',
    duration: '00:53',
    thumbnail: 'https://picsum.photos/seed/v1/400/225'
  },
  {
    id: '2',
    title: '【牌子】当世界过分"诚实"，我们要如何保持好奇与勇气【B站...',
    author: 'DiDi_OK',
    date: '02-03',
    views: '915.7万',
    comments: '7162',
    duration: '07:45',
    thumbnail: 'https://picsum.photos/seed/v2/400/225'
  },
  {
    id: '3',
    title: '免疫系统：当守护者成为毁灭者【视频类赛道 AI真实叙事影片】',
    author: '大圆镜科普',
    date: '2025-07-12',
    views: '901.5万',
    comments: '5173',
    duration: '07:17',
    thumbnail: 'https://picsum.photos/seed/v3/400/225'
  },
  {
    id: '4',
    title: '把远古沧龙做成六道菜（上）',
    author: '黄浦江三文鱼',
    date: '2025-10-18',
    views: '777.1万',
    comments: '6253',
    duration: '06:23',
    thumbnail: 'https://picsum.photos/seed/v4/400/225'
  },
  {
    id: '5',
    title: '95%的人都不知道的4个宝藏网站，每个都值得裂墙推荐！',
    author: '晚晚是也',
    date: '2023-12-01',
    views: '532.4万',
    comments: '136',
    duration: '02:19',
    thumbnail: 'https://picsum.photos/seed/v5/400/225'
  },
  {
    id: '6',
    title: '城市被水淹没，员工们竟然潜水上班！离谱短片',
    author: '老夜讲电影',
    date: '2024-08-06',
    views: '514.5万',
    comments: '73',
    duration: '01:26',
    thumbnail: 'https://picsum.photos/seed/v6/400/225'
  },
  {
    id: '7',
    title: '当用AI把历史名人变成游戏Boss【第三期】',
    author: '冬芝鹿',
    date: '2025-09-06',
    views: '497.9万',
    comments: '2.4万',
    duration: '01:31',
    thumbnail: 'https://picsum.photos/seed/v7/400/225'
  },
  {
    id: '8',
    title: '[第一人称] 你已经中了我幻术了！',
    author: '不自由摄影师winga',
    date: '2024-02-02',
    views: '479.7万',
    comments: '3556',
    duration: '06:48',
    thumbnail: 'https://picsum.photos/seed/v8/400/225'
  }
];

export const TEST_CHANNELS: TestChannel[] = [
  { id: 'bilibili', name: 'B站', color: '#FB7299' },
  { id: 'douyin', name: '抖音', color: '#FE2C55' },
  { id: 'xiaohongshu', name: '小红书', color: '#FF2442' },
  { id: 'gongzhonghao', name: '公众号', color: '#07C160' },
  { id: 'kuaishou', name: '快手', color: '#FF4906' },
  { id: 'toutiao', name: '头条', color: '#F85959' },
];

export const TESTER_COUNT_OPTIONS = [
  { value: 2000, label: '2,000 人', recommend: '适合快速验证' },
  { value: 5000, label: '5,000 人', recommend: '基础统计参考' },
  { value: 10000, label: '10,000 人', recommend: '推荐 · 中等置信度' },
  { value: 20000, label: '20,000 人', recommend: '推荐 · 高置信度' },
  { value: 30000, label: '30,000 人', recommend: '最高置信度' },
];

export const TEST_GROUPS: TestGroup[] = [
  { id: 'age_18_24', name: '18-24岁', category: 'age' },
  { id: 'age_25_34', name: '25-34岁', category: 'age' },
  { id: 'age_35_44', name: '35-44岁', category: 'age' },
  { id: 'age_45_plus', name: '45岁以上', category: 'age' },
  { id: 'gender_male', name: '男性', category: 'gender' },
  { id: 'gender_female', name: '女性', category: 'gender' },
  { id: 'interest_tech', name: '科技数码', category: 'interest' },
  { id: 'interest_fashion', name: '时尚美妆', category: 'interest' },
  { id: 'interest_food', name: '美食生活', category: 'interest' },
  { id: 'interest_gaming', name: '游戏动漫', category: 'interest' },
  { id: 'interest_knowledge', name: '知识科普', category: 'interest' },
  { id: 'interest_entertainment', name: '娱乐搞笑', category: 'interest' },
];

export const COVER_COLORS = [
  { label: 'A', bg: 'from-[#00FFCC]/10 to-[#00FFCC]/5', border: 'border-[#00FFCC]/20', text: 'text-[#00FFCC]', hoverBorder: 'hover:border-[#00FFCC]/40', hoverShadow: 'hover:shadow-[0_0_20px_rgba(0,255,204,0.15)]' },
  { label: 'B', bg: 'from-[#F9D976]/10 to-[#B38728]/5', border: 'border-[#D4AF37]/20', text: 'text-[#D4AF37]', hoverBorder: 'hover:border-[#D4AF37]/40', hoverShadow: 'hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]' },
  { label: 'C', bg: 'from-[#8800ff]/10 to-[#8800ff]/5', border: 'border-[#8800ff]/20', text: 'text-[#8800ff]', hoverBorder: 'hover:border-[#8800ff]/40', hoverShadow: 'hover:shadow-[0_0_20px_rgba(136,0,255,0.15)]' },
  { label: 'D', bg: 'from-[#FF6B6B]/10 to-[#FF6B6B]/5', border: 'border-[#FF6B6B]/20', text: 'text-[#FF6B6B]', hoverBorder: 'hover:border-[#FF6B6B]/40', hoverShadow: 'hover:shadow-[0_0_20px_rgba(255,107,107,0.15)]' },
];

export const INDUSTRY_BENCHMARKS: Record<string, number> = {
  bilibili: 8.5,
  douyin: 12.0,
  xiaohongshu: 10.5,
  gongzhonghao: 6.8,
  kuaishou: 11.2,
  toutiao: 7.5,
};

export const CONFIDENCE_LEVELS = [
  { minTesters: 20000, label: '高置信度', color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/30' },
  { minTesters: 5000, label: '中置信度', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/30' },
  { minTesters: 0, label: '低置信度', color: 'text-red-400', bgColor: 'bg-red-400/10', borderColor: 'border-red-400/30' },
];

export const MOCK_COVER_IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
];

export const MOCK_TITLES = [
  'AI黑科技：这个工具让你效率提升10倍',
  '震惊！99%的人都不知道这个秘密',
  '手把手教你：3天掌握一项新技能',
  '深度解析：为什么这个方法如此有效',
  '实测有效：我用了这个方法后...',
  '必看！这些技巧让你事半功倍',
  '独家揭秘：行业内幕大公开',
  '干货满满：从零开始到精通',
];

export const CHANNEL_CTR_PATTERNS: Record<string, { baseCtr: number; variance: number }> = {
  bilibili: { baseCtr: 9.2, variance: 4.5 },
  douyin: { baseCtr: 13.5, variance: 5.8 },
  xiaohongshu: { baseCtr: 11.8, variance: 4.2 },
  gongzhonghao: { baseCtr: 7.5, variance: 3.2 },
  kuaishou: { baseCtr: 12.8, variance: 5.5 },
  toutiao: { baseCtr: 8.2, variance: 3.8 },
};

export const COVER_PERFORMANCE_MULTIPLIERS = [1.35, 1.0, 0.85, 0.72];

export const GROUP_CTR_BIAS: Record<string, number> = {
  age_18_24: 1.15,
  age_25_34: 1.08,
  age_35_44: 0.95,
  age_45_plus: 0.78,
  gender_male: 1.0,
  gender_female: 1.05,
  interest_tech: 1.12,
  interest_fashion: 1.08,
  interest_food: 0.98,
  interest_gaming: 1.18,
  interest_knowledge: 0.92,
  interest_entertainment: 1.05,
};

export const GROUP_WEIGHTS: Record<string, number> = {
  age_18_24: 0.25,
  age_25_34: 0.30,
  age_35_44: 0.25,
  age_45_plus: 0.20,
  gender_male: 0.50,
  gender_female: 0.50,
  interest_tech: 0.20,
  interest_fashion: 0.18,
  interest_food: 0.18,
  interest_gaming: 0.16,
  interest_knowledge: 0.14,
  interest_entertainment: 0.14,
};
