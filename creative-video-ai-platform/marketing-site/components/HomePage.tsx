'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Users, ArrowRight, CheckCircle, Play, Smartphone, Globe, FileText, BarChart3, Clock, TrendingUp, Eye, Shield, DollarSign } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const features = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: '多平台封面比例适配',
    description: '支持抖音、快手、知乎、小红书、视频号、百家号等数十个主流平台，智能适配平台封面比例',
    color: 'from-blue-500 to-cyan-500',
    demoImage: '/demo-platforms.svg',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI智能创作',
    description: '一键生成封面艺术字和创意背景素材，从AI大模型获取灵感，使用灵感，提升创作效率',
    color: 'from-purple-500 to-pink-500',
    demoImage: '/demo-ai.svg',
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: '真实的预览呈现',
    description: '导出真实手机/网页截图，让领导直观看到封面在信息流中的效果',
    color: 'from-green-500 to-teal-500',
    demoImage: '/demo-creation.svg',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: '点击率预测',
    description: '数万真人测试封面点击数据，输出量化分析报告，为广告投放提供依据',
    color: 'from-orange-500 to-red-500',
    demoImage: '/demo-ctr.svg',
  },
];

const platforms = [
  { logo: '/logos/ACfan.png' },
  { logo: '/logos/CSDN.png' },
  { logo: '/logos/QQ.png' },
  { logo: '/logos/18f76686-84e5-458d-8385-2ec4a0822d85.png' },
  { logo: '/logos/ad5a9d3a-c1e6-42e2-8122-75a9121dbb00.png' },
  { logo: '/logos/adc19a58-3857-402d-867d-8ca32b288348.png' },
  { logo: '/logos/b8ccc7d2-2328-4c14-a9fe-465c9e2d076f.png' },
  { logo: '/logos/bafb0758-d67e-4f07-8290-5b7aa550aaf3.png' },
  { logo: '/logos/bfd4b155-2e5e-4715-9bfe-28b295ddc8fc.png' },
  { logo: '/logos/bilibili.png' },
  { logo: '/logos/c0c7f281-b8f0-4485-99c9-935b709efa4c.png' },
  { logo: '/logos/c90b211d-c64d-4cad-9725-7988e7d3210c.png' },
  { logo: '/logos/dbe26abb-9ad2-41c6-80fd-0f19e83b5614.png' },
  { logo: '/logos/ebac0f03-199a-49e4-a423-ec7d4e6dea2e.png' },
  { logo: '/logos/eeaafbf1-1215-46af-b898-2cc2c5ddf45b.png' },
  { logo: '/logos/f8e96e74-911b-42bb-9ccb-b64c145f3b23.png' },
  { logo: '/logos/facebook.png' },
  { logo: '/logos/fe7b6532-e1c2-47d8-9f62-1f546e29f60e.png' },
  { logo: '/logos/ff06532f-eb76-4aa2-bf9b-9a38f674b08e.png' },
  { logo: '/logos/ins.png' },
  { logo: '/logos/youtube.png' },
  { logo: '/logos/万能钥匙.png' },
  { logo: '/logos/公众号.png' },
  { logo: '/logos/大鱼.png' },
  { logo: '/logos/头条.png' },
  { logo: '/logos/小红书.png' },
  { logo: '/logos/微信.png' },
  { logo: '/logos/快传号.png' },
  { logo: '/logos/拼多多.png' },
  { logo: '/logos/搜狐.png' },
  { logo: '/logos/新浪.png' },
  { logo: '/logos/易车.png' },
  { logo: '/logos/汽车之家.png' },
  { logo: '/logos/爱奇艺.png' },
  { logo: '/logos/知乎.png' },
  { logo: '/logos/简书.png' },
  { logo: '/logos/网易.png' },
  { logo: '/logos/腾讯视频.png' },
  { logo: '/logos/豆瓣.png' },
  { logo: '/logos/雪球.png' },
];

const benefits = [
  '告别PS，在线一键制作',
  'AI赋能，创意无限',
  '多平台适配，一次搞定',
  '数据驱动，点击可预测',
];

export default function HomePage() {
  return (
    <>
      <section className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                ✨ 为视频创作者打造的AI封面制作平台
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                让你的视频封面
                <br />
                <span className="gradient-text">脱颖而出</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                告别繁琐的PS操作，用AI赋能创作。支持十多个平台的封面尺寸适配，
                智能生成艺术字和创意素材，真实预览点击率预测，让你的视频在发布前就赢在起跑线。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" href="/pricing">
                  免费开始使用
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="mr-2 w-5 h-5" />
                  观看演示视频
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-20"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-4xl mx-auto overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 flex items-center justify-center">
                  <img 
                    src="/demo-creation.svg" 
                    alt="平台界面预览"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">支持全平台</h2>
            <p className="text-xl text-gray-600">一键将封面适配主流平台，省时省力高效管理</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src={platform.logo} 
                  alt="platform"
                  className="w-16 h-16 mx-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">四大核心价值</h2>
            <p className="text-xl text-gray-600">从创意、协作到数据验证，一站式搞定高点击率的视频封面与标题</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mr-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">制作效率革命</h3>
                  <p className="text-gray-500">制作封面无需ps，AI一句话给4张</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                    全平台适配，一键分发
                  </h4>
                  <p className="text-gray-600">设计一次，自动适配所有主流视频平台的封面尺寸规范。省去所有重复性调整工作，让你专注于内容本身。</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-500" />
                    云端在线，专业级编辑器
                  </h4>
                  <p className="text-gray-600">浏览器里打开就是你的创作工作台。内置专业级编辑功能，完全可以替代PS的日常封面制作需求。</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mr-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">创意赋能</h3>
                  <p className="text-gray-500">AI 助攻，打破灵感枯竭</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                    AI 创意伙伴，灵感永不枯竭
                  </h4>
                  <p className="text-gray-600">不知道标题怎么起？封面怎么排版？输入你的视频关键词，AI能为你生成数十种风格的艺术字、标题文案和构图灵感。</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-500" />
                    海量正版素材，AI 一键生成
                  </h4>
                  <p className="text-gray-600">内置庞大素材库，并可通过AI生成独一无二的背景、元素。彻底解决素材版权焦虑，让你的封面既安全又独特。</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">协同升级</h3>
                  <p className="text-gray-500">沉浸式审核，决策更精准</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-green-500" />
                    "所见即所得"的信息流预览
                  </h4>
                  <p className="text-gray-600">一键生成包含封面、标题、UP主头像、播放量等元素的"模拟App截图"。让所有决策者在最真实的环境下，直观感受封面的吸引力。</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    告别无效沟通，加速审核流程
                  </h4>
                  <p className="text-gray-600">当大家看到的都是同一个"真实场景"，沟通的焦点会从"这个字号是28还是30"转移到"这个封面在旁边那堆视频里能不能脱颖而出"。</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 mr-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">增长黑客</h3>
                  <p className="text-gray-500">科学验证，用数据驱动爆款</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-orange-500" />
                    真人A/B测试，预知点击真相
                  </h4>
                  <p className="text-gray-600">发布前，将你的多个封面和标题方案，投放给海量真实用户进行"模拟点击测试"。用真实的用户行为数据告诉你，哪个组合的点击率（CTR）最高。</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                    为商业投放保驾护航
                  </h4>
                  <p className="text-gray-600">对于商业合作视频，这份"预发布点击报告"是向品牌方证明你专业性的最佳武器。5万/年的测试费，可能在一个商业项目中就赚回来了。</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-xl text-gray-600">四大核心功能，全方位提升视频点击率</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <img 
                    src={feature.demoImage} 
                    alt={feature.title}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                为什么选择我们？
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" href="/features">
                  了解更多功能
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white rounded-xl p-8">
                  <div className="text-center">
                    <Users className="w-24 h-24 mx-auto mb-6 text-blue-500" />
                    <div className="text-5xl font-bold gradient-text mb-2">10,000+</div>
                    <p className="text-gray-600 text-lg">视频创作者的选择</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            准备好提升你的视频点击率了吗？
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            立即免费试用，体验AI驱动的封面创作，让你的视频在海量内容中脱颖而出
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/pricing">
              免费开始使用
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/features" className="px-8 py-4 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
              了解更多详情
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
