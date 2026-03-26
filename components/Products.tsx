'use client'

import { motion } from 'framer-motion'
import { products } from '@/data/products'
import { ExternalLink } from 'lucide-react'

export function Products() {
  return (
    <section id="products" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">产品项目</span>
          </h2>
          <p className="text-gray-400 text-lg">
            创新驱动，技术领先，持续迭代
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-4xl">
                <span className="text-white">🤖</span>
              </div>

              {/* Name and Description */}
              <h3 className="text-2xl font-bold mb-3 text-center">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed text-center">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link Button */}
              <button className="w-full gradient-bg text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                了解更多
                <ExternalLink className={ml-2} size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
