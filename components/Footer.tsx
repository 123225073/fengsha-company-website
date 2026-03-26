'use client'

import { companyInfo } from '@/data/company'

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🦞</span>
              <span className="text-xl font-bold gradient-text">
                风沙一人创业公司
              </span>
            </div>
            <p className="text-gray-400">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white transition-colors">
                  团队介绍
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                  产品项目
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">联系方式</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                📱 {companyInfo.contact.phone}
              </li>
              <li className="text-gray-400">
                💬 {companyInfo.contact.wechat}
              </li>
              <li className="text-gray-400">
                📝 {companyInfo.social.csdn.username}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2026 风沙一人创业公司. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Powered by Next.js + React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
