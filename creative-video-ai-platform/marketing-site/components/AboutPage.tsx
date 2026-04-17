'use client';

import { motion } from 'framer-motion';
import { Sparkles, Target, Users, Lightbulb, Shield, Rocket, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const values = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: '创新驱动',
    description: '持续探索AI技术在视频创作领域的应用，为用户提供最前沿的工具和体验',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '用户至上',
    description: '深入理解视频创作者的痛点，以用户需求为导向打造产品',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '品质保证',
    description: '严格把控产品质量和服务质量，确保每一位用户获得最佳体验',
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: '快速迭代',
    description: '根据用户反馈快速优化产品，保持与市场和技术的同步发展',
  },
];

const stats = [
  { value: '10,000+', label: '活跃创作者' },
  { value: '500,000+', label: '封面制作' },
  { value: '10+', label: '支持平台' },
  { value: '98%', label: '用户满意度' },
];

const team = [
  {
    name: '张明',
    role: '创始人 & CEO',
    description: '10年视频行业经验，曾任职于字节跳动',
  },
  {
    name: '李雪',
    role: '技术总监',
    description: '前阿里巴巴高级工程师，AI领域专家',
  },
  {
    name: '王强',
    role: '产品负责人',
    description: '8年产品设计经验，专注创作者工具',
  },
];

export default function AboutPage() {
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
              关于<span className="gradient-text">我们</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们致力于用技术赋能视频创作者，让每一个人都能轻松制作出专业的视频封面
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的使命</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                全能封面诞生于2024年，我们深刻理解视频创作者在封面制作过程中的痛点和挑战。传统PS操作复杂、多平台尺寸要求不一、缺乏数据支持的决策——这些问题困扰着无数创作者。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                我们决定用AI技术改变这一切。通过整合先进的AI大模型、真人测试数据和智能化工作流程，我们为创作者提供了一站式的解决方案，让专业的封面制作变得简单、高效、可量化。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                我们的愿景是成为视频创作者最值得信赖的合作伙伴，帮助每一位创作者在海量内容中脱颖而出。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white rounded-xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-24 h-24 mx-auto mb-6 text-blue-500" />
                    <p className="text-gray-500 text-lg">团队合影</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">我们的价值观</h2>
            <p className="text-xl text-gray-600">指导我们前进的核心原则</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心团队</h2>
            <p className="text-xl text-gray-600">一群热爱视频和技术的专业人士</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h2>
            <p className="text-xl text-gray-600">有任何问题或合作意向？我们随时为您服务</p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <p className="text-gray-600 mb-1">邮箱</p>
                <p className="font-medium text-gray-900">contact@example.com</p>
              </div>
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <p className="text-gray-600 mb-1">电话</p>
                <p className="font-medium text-gray-900">400-123-4567</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <p className="text-gray-600 mb-1">地址</p>
                <p className="font-medium text-gray-900">北京市朝阳区</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                发送邮件
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/pricing" className="px-8 py-4 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                查看定价方案
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
