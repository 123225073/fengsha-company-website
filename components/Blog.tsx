'use client'

import { motion } from 'framer-motion'
import { companyInfo } from '@/data/company'
import { ExternalLink, BookOpen } from 'lucide-react'

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">博客资讯</span>
          </h2>
          <p className="text-gray-400 text-lg">
            技术分享，实战经验，持续更新
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* WeChat Official Account */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-3xl">💬</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">微信公众号</h3>
                <p className="text-gray-400">{companyInfo.social.wechat.name}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              关注我们的微信公众号，获取最新的技术分享、项目动态和实战经验。
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <BookOpen className={mr-2} size={18} />
                <span>AI 技术分享</span>
              </div>
              <div className="flex items-center text-gray-400">
                <BookOpen className={mr-2} size={18} />
                <span>项目实战教程</span>
              </div>
              <div className="flex items-center text-gray-400">
                <BookOpen className={mr-2} size={18} />
                <span>行业动态分析</span>
              </div>
            </div>
          </motion.div>

          {/* CSDN Blog */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-3xl">📝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">CSDN 博客</h3>
                <p className="text-gray-400">{companyInfo.social.csdn.username}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              访问我的 CSDN 博客，查看更多技术文章、代码示例和开发心得。
            </p>

            <a
              href={companyInfo.social.csdn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              访问博客
              <ExternalLink className={ml-2} size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
