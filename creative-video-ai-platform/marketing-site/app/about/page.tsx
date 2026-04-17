import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: '关于我们 - 创意视频AI平台',
  description: '了解创意视频AI平台的故事、使命和团队。我们致力于用AI技术赋能视频创作者，让每一个人都能轻松制作出专业的视频封面。',
  keywords: ['关于我们', '公司介绍', '团队介绍', '公司使命', '联系方式'],
  openGraph: {
    title: '关于我们 - 创意视频AI平台',
    description: '了解创意视频AI平台的故事、使命和团队',
    url: 'https://yourdomain.com/about',
  },
};

export default function About() {
  return <AboutPage />;
}
