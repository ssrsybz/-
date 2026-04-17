
export enum AppView {
  HOME = 'home',
  WORKSPACE = 'workspace'
}

export enum WorkspaceTab {
  INSPIRATION = 'inspiration',
  CREATION = 'creation',
  EXPORT = 'export',
  CTR = 'ctr'
}

export enum SidebarItem {
  PERSONAL_INSPIRATION = 'personal_inspiration',
  INSPIRATION_LIBRARY = 'inspiration_library',
  HOT_REPRODUCTION = 'hot_reproduction'
}

export enum ExportSubTab {
  NORMAL = 'normal',
  CROSS_PLATFORM = 'cross_platform',
  PREVIEW = 'preview'
}

export interface VideoTrend {
  id: string;
  title: string;
  author: string;
  date: string;
  views: string;
  comments: string;
  duration: string;
  thumbnail: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  platform: Platform;
  ratio: AspectRatio;
  createdAt: Date;
  isFavorite: boolean;
  batchIndex?: number;
}

export enum Platform {
  BILIBILI = 'bilibili',
  DOUYIN = 'douyin',
  XIAOHONGSHU = 'xiaohongshu',
  GONGZHONGHAO = 'gongzhonghao',
  CUSTOM = 'custom'
}

export enum AspectRatio {
  BILIBILI = '16:9',
  DOUYIN = '9:16',
  XIAOHONGSHU = '3:4',
  GONGZHONGHAO = '16:9',
  CUSTOM = '1:1'
}

export interface CoverItem {
  id: string;
  label: string;
  imageUrl: string;
  file?: File;
}

export interface TitleOption {
  id: string;
  text: string;
}

export interface TestChannel {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface TestGroup {
  id: string;
  name: string;
  category: 'age' | 'gender' | 'interest';
}

export interface TestConfig {
  channels: TestChannel[];
  testerCount: number;
  testGroups: TestGroup[];
}

export interface CTRReportItem {
  coverId: string;
  coverLabel: string;
  coverImageUrl: string;
  titleId: string;
  titleText: string;
  channelId: string;
  channelName: string;
  impressions: number;
  clicks: number;
  ctr: number;
  groupId?: string;
  groupName?: string;
}

export interface CTRReport {
  id: string;
  items: CTRReportItem[];
  totalTesters: number;
  createdAt: Date;
  status: 'pending' | 'running' | 'completed';
  shareLink?: string;
}

export type CTRViewStep = 'config' | 'testing' | 'report';

export enum CTRReportTab { OVERVIEW = 'overview', CHANNEL_COMPARE = 'channel_compare', AUDIENCE = 'audience' }
