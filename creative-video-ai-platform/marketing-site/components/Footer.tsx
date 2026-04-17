'use client';

import Link from 'next/link';
import { Sparkles, Mail, Github, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { name: '功能介绍', href: '/features' },
    { name: '定价方案', href: '/pricing' },
    { name: '使用教程', href: '#' },
    { name: '常见问题', href: '#' },
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '联系我们', href: '#' },
    { name: '隐私政策', href: '#' },
    { name: '服务条款', href: '#' },
  ],
  resources: [
    { name: '博客', href: '#' },
    { name: '帮助中心', href: '#' },
    { name: 'API文档', href: '#' },
    { name: '状态监控', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">全能封面</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              为视频创作者提供一站式封面制作、标题优化和点击率预测服务
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">产品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">公司</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 全能封面. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
