'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { companyInfo } from '@/data/company'
import { Phone, MessageCircle, Mail, Send } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现表单提交逻辑
    alert('感谢您的留言！我们会尽快回复您。')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">联系我们</span>
          </h2>
          <p className="text-gray-400 text-lg">
            有任何问题或建议？欢迎随时联系我们
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-8">联系方式</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-start/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-primary-start" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">电话</p>
                    <p className="text-xl font-medium">{companyInfo.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-end/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="text-primary-end" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">微信</p>
                    <p className="text-xl font-medium">{companyInfo.contact.wechat}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">邮箱</p>
                    <p className="text-xl font-medium">联系方式待添加</p>
                  </div>
                </div>
              </div>

              {/* WeChat QR Code Placeholder */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-4 text-center">微信二维码</p>
                <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
                  <span className="text-gray-400">二维码待添加</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-8">发送消息</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-start focus:outline-none transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-start focus:outline-none transition-colors"
                    placeholder="请输入您的邮箱"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    留言内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-start focus:outline-none transition-colors resize-none"
                    rows={6}
                    placeholder="请输入您的留言内容"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2" size={20} />
                  发送消息
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
