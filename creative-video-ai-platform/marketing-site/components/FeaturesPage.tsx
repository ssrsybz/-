'use client';

import { motion } from 'framer-motion';
import { Globe, Sparkles, Smartphone, BarChart3, CheckCircle, ArrowRight, Layers, Image as ImageIcon, Type, Eye, TrendingUp } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const features = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: '多平台封面比例适配',
    description: '支持抖音、快手、知乎、小红书、视频号、百家号等主流平台。每个平台都有独特的封面尺寸要求，我们提供自动适配功能，一键生成符合各平台规范的封面图。',
    features: [
      '支持主流视频平台',
      '自动适配不同尺寸比例',
      '一键批量导出多平台版本',
      '实时预览各平台显示效果',
    ],
    color: 'from-blue-500 to-cyan-500',
    demoImage: '/demo-platforms.svg',
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: 'AI智能创作',
    description: '告别传统PS繁琐操作，利用AI大模型能力，智能生成艺术字、创意素材和标题建议。用户可以从AI提供的灵感中直接选择使用，大幅提升创作效率。',
    features: [
      'AI生成精美艺术字',
      '智能推荐创意素材',
      '标题创意自动生成',
      '会员积分制灵活使用',
    ],
    color: 'from-purple-500 to-pink-500',
    demoImage: '/demo-ai.svg',
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: '预览审核流程',
    description: '优化的领导审核流程，支持导出手机、网页等真实场景下的预览图。预览图中包含封面、标题以及周围真实视频内容，让审核者直观看到最终效果。',
    features: [
      '手机端真实预览效果',
      '网页端信息流预览',
      '一键生成审核截图',
      '支持多尺寸预览导出',
    ],
    color: 'from-green-500 to-teal-500',
    demoImage: '/demo-creation.svg',
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: '点击率预测',
    description: '创新的真人测试功能，让真实用户对创作者设计的多个封面和标题进行点击测试。输出详细的点击分析报告，为视频发布和广告投放提供数据支持。',
    features: [
      '真人用户点击测试',
      '量化点击数据报告',
      '多版本A/B测试',
      '年度套餐100个封面',
    ],
    color: 'from-orange-500 to-red-500',
    demoImage: '/demo-ctr.svg',
  },
];

const workflowSteps = [
  {
    icon: <Type className="w-8 h-8" />,
    title: '输入创意',
    description: '用一句话描述视频内容或直接粘贴创意文稿，AI 将结合大数据为你推荐最优封面方案',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI生成',
    description: 'AI智能生成封面和标题创意方案',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: '在线编辑',
    description: '丰富的编辑工具，自由调整设计细节',
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: '预览测试',
    description: '真实预览和点击率测试，优化效果',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: '发布导出',
    description: '导出各平台版本，直接使用或发布',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              全方位的功能，<span className="gradient-text">助力视频创作</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从封面制作到点击率预测，我们提供完整的工作流程，让每一个视频都能获得最佳表现
            </p>
          </motion.div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 h-80 flex items-center justify-center overflow-hidden">
                    <img 
                      src={feature.demoImage} 
                      alt={feature.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">完整的工作流程</h2>
            <p className="text-xl text-gray-600">五步完成从创意到发布</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="absolute top-4 right-4 text-2xl font-bold text-gray-200">
                    {index + 1}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${
                      index === 0 ? 'from-blue-500 to-cyan-500' :
                      index === 1 ? 'from-purple-500 to-pink-500' :
                      index === 2 ? 'from-green-500 to-teal-500' :
                      index === 3 ? 'from-orange-500 to-red-500' :
                      'from-indigo-500 to-blue-500'
                    } mb-4`}>
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            准备好体验完整功能了吗？
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            立即开始使用，让AI赋能你的视频创作
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/pricing">
              查看定价方案
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/" className="px-8 py-4 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
              返回首页
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
