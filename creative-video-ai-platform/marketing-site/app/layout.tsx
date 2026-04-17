import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: '创意视频AI平台 - 专业视频封面制作与标题优化工具',
  description: '为视频创作者提供一站式封面制作、标题优化和点击率预测服务。支持抖音、B站、小红书等十多个平台，AI智能生成艺术字和创意素材，真人测试点击数据，让你的视频在发布前就赢在起跑线。',
  keywords: ['视频封面制作', '封面设计', '视频标题优化', 'AI封面生成', '点击率预测', '抖音封面', 'B站封面', '小红书封面', '视频营销', '视频创作者工具'],
  authors: [{ name: '创意视频AI平台' }],
  creator: '创意视频AI平台',
  publisher: '创意视频AI平台',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourdomain.com',
    title: '创意视频AI平台 - 专业视频封面制作与标题优化工具',
    description: '为视频创作者提供一站式封面制作、标题优化和点击率预测服务',
    siteName: '创意视频AI平台',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '创意视频AI平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '创意视频AI平台 - 专业视频封面制作与标题优化工具',
    description: '为视频创作者提供一站式封面制作、标题优化和点击率预测服务',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: '创意视频AI平台',
              description: '为视频创作者提供一站式封面制作、标题优化和点击率预测服务',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'CNY',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '10000',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
