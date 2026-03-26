'use client'

import { motion } from 'framer-motion'
import { teamMembers } from '@/data/team'

export function Team() {
  return (
    <section id="team" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">团队成员</span>
          </h2>
          <p className="text-gray-400 text-lg">
            AI驱动的精英团队，各司其职，协同高效
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Avatar - 使用Emoji作为临时头像 */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center shadow-xl">
                <div className="text-6xl text-white">
                  {member.emoji}
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1 flex items-center justify-center">
                  {member.name}
                  <span className={ml-2}>{member.emoji}</span>
                </h3>
                <p className="text-accent font-medium">{member.role}</p>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-4 leading-relaxed">
                {member.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-start/20 text-primary-start rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
