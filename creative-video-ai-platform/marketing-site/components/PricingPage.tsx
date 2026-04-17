'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star, ArrowRight, HelpCircle } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    name: '免费版',
    icon: <Zap className="w-6 h-6" />,
    price: '0',
    period: '永久免费',
    description: '适合个人创作者体验平台功能',
    features: [
      '基础封面编辑工具',
      '3个平台封面尺寸',
      '每日5次AI生成',
      '基础模板库',
      '标准导出功能',
    ],
    limitations: [
      '不支持多平台批量导出',
      '不支持真人点击测试',
      '无专属客服支持',
    ],
    cta: '免费开始',
    popular: false,
  },
  {
    name: '专业版',
    icon: <Star className="w-6 h-6" />,
    price: '299',
    period: '/月',
    description: '适合活跃的创作者和小型团队',
    features: [
      '全部封面编辑功能',
      '10+平台尺寸适配',
      '每日50次AI生成',
      '高级模板库',
      '多平台批量导出',
      '手机/网页预览导出',
      '优先客服支持',
    ],
    limitations: [],
    cta: '开始试用',
    popular: true,
  },
  {
    name: '年度测试套餐',
    icon: <Crown className="w-6 h-6" />,
    price: '50,000',
    period: '/年',
    description: '专业创作者和MCN机构首选',
    features: [
      '包含专业版所有功能',
      '100个封面点击率测试',
      '真人用户真实点击数据',
      '详细点击分析报告',
      '多版本A/B测试',
      '专属客户经理',
      'API接口访问',
      '定制化培训服务',
    ],
    limitations: [],
    cta: '联系销售',
    popular: false,
  },
];

const faqs = [
  {
    question: 'AI生成功能如何计费？',
    answer: 'AI生成功能采用会员积分制。每次AI生成（艺术字、素材、标题建议等）都会消耗相应积分。免费版用户每日可免费使用5次，付费用户获得更多积分额度。',
  },
  {
    question: '年度测试套餐包含哪些内容？',
    answer: '年度测试套餐价格5万元/年，包含100个封面的真人点击率测试服务。每次测试可提供4-5个封面版本进行对比，并输出详细的点击分析报告。',
  },
  {
    question: '可以随时升级套餐吗？',
    answer: '是的，您可以随时升级套餐。升级后的权益立即生效，费用将按照剩余月数按比例计算差价。',
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持微信支付、支付宝、银行转账等多种支付方式。企业用户可申请对公转账。',
  },
  {
    question: '免费版有使用期限吗？',
    answer: '免费版没有使用期限，您可以永久免费使用。但功能相对有限，如需更多功能请升级到付费版本。',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              灵活的<span className="gradient-text">定价方案</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从免费体验到专业服务，选择最适合你的方案。所有付费方案都支持随时取消。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      最受欢迎
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2 mb-4">
                  <div className={plan.popular ? 'text-white' : 'text-blue-600'}>
                    {plan.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                </div>
                <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      ¥{plan.price}
                    </span>
                    <span className={`ml-2 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((limit, i) => (
                    <li key={i} className="flex items-start space-x-3 opacity-60">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5">-</div>
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {limit}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : ''
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">常见问题</h2>
            <p className="text-xl text-gray-600">了解更多关于定价和服务的信息</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <HelpCircle
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            需要定制方案？
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            如果您有特殊需求，我们的团队可以为您定制专属解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              联系销售团队
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
