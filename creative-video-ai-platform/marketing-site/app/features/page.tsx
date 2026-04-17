import { Metadata } from 'next';
import FeaturesPage from '@/components/FeaturesPage';

export const metadata: Metadata = {
  title: '功能介绍 - 创意视频AI平台',
  description: '了解创意视频AI平台的核心功能：多平台封面适配、AI智能创作、预览审核流程、点击率预测。全方位助力视频创作者提升内容质量。',
  keywords: ['视频封面制作功能', 'AI封面生成', '多平台适配', '点击率预测', '视频标题优化', '封面预览'],
  openGraph: {
    title: '功能介绍 - 创意视频AI平台',
    description: '了解创意视频AI平台的核心功能：多平台封面适配、AI智能创作、预览审核流程、点击率预测',
    url: 'https://yourdomain.com/features',
  },
};

export default function Features() {
  return <FeaturesPage />;
}
