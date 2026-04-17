import { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: '定价方案 - 创意视频AI平台',
  description: '灵活的定价方案，从免费体验到专业服务。AI生成采用会员积分制，年度测试套餐5万/年包含100个封面真人点击率测试。',
  keywords: ['视频封面制作价格', 'AI封面生成收费', '点击率测试价格', '视频封面工具定价', '年度测试套餐'],
  openGraph: {
    title: '定价方案 - 创意视频AI平台',
    description: '灵活的定价方案，从免费体验到专业服务',
    url: 'https://yourdomain.com/pricing',
  },
};

export default function Pricing() {
  return <PricingPage />;
}
