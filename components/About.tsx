'use client'

import { motion } from 'framer-motion'
import { companyInfo } from '@/data/company'

export function About() {
  return (
    <section id="about" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">关于我们</span>
          </h2>

          {/* Company Description */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8 shadow-xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🎯</span>
                <h3 className="text-2xl font-bold gradient-text">">愿景</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {companyInfo.vision}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🚀</span>
                <h3 className="text-2xl font-bold gradient-text">">使命</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {companyInfo.mission}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
