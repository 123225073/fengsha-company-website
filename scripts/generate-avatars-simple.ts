const GEMINI_API_KEY = 'AIzaSyCHL3fWdUEih-q3Smd1Qify-0nTdsdb7X0'
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent'

const teamMembers = [
  {
    id: 'main',
    name: '小风',
    role: 'CEO',
    prop: '穿着现代商务西装、打着精致领带，手持公司Logo或管理文档',
  },
  {
    id: 'lingxi',
    name: '灵犀',
    role: '产品合伙人',
    prop: '穿着设计师服饰，手持产品原型图或创意板',
  },
  {
    id: 'sinan',
    name: '司南',
    role: '架构合伙人',
    prop: '穿着工程师装，手持架构图或科技设备',
  },
  {
    id: 'warp',
    name: '跃迁',
    role: '研发合伙人',
    prop: '穿着程序员T恤，手持笔记本电脑或代码屏幕',
  },
  {
    id: 'frost',
    name: '霜刃',
    role: '质量安全合伙人',
    prop: '穿着测试员装，手持放大镜或盾牌',
  },
  {
    id: 'mobius',
    name: '莫比乌斯',
    role: '运维合伙人',
    prop: '穿着运维装，手持服务器或网络图标',
  },
  {
    id: 'zhuge',
    name: '诸葛',
    role: '知识沉淀师',
    prop: '穿着学者服饰，手持书本或知识图谱',
  },
]

async function generateAvatar(member: typeof teamMembers[0]) {
  const prompt = `生成一张Q版龙虾的全身照，双腿站立，一幅高质量的电影级广角画面，
展现了一只可爱、拟人化的短胖龙虾穿着现代科技风格的统一公司制服${member.prop}，
龙虾摆出充满童趣、拟人化的站立姿势，用可爱的表情注视着镜头。
柔和的自然光线、8K分辨率、逼真写实、超精细的甲壳质感、鲜艳的色彩、温馨的科技氛围。
这个龙虾是风沙一人创业公司的${member.role}${member.name}成员。`

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log(`❌ HTTP ${response.status}: ${errorText}`)
      return false
    }

    const data = await response.json()

    if (data.contents?.length > 0) {
      const imageData = data.contents[0].parts[0].inline_data?.data

      if (imageData) {
        // 保存图片到 public/images/team/ 目录
        const buffer = Buffer.from(imageData, 'base64')
        const fs = require('fs')
        const path = require('path')

        const outputPath = path.join(process.cwd(), 'public', 'images', 'team', `${member.id}.png`)

        // 确保目录存在
        const dir = path.dirname(outputPath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        fs.writeFileSync(outputPath, buffer)
        console.log(`✅ Generated avatar for ${member.name}: ${outputPath}`)
        return true
      } else {
        console.log(`❌ No image data for ${member.name}`)
        return false
      }
    } else {
      console.log(`❌ Failed to generate avatar for ${member.name}`)
      console.log(JSON.stringify(data, null, 2))
      return false
    }
  } catch (error) {
    console.log(`❌ Error generating avatar for ${member.name}:`, error)
    return false
  }
}

async function main() {
  console.log('🦞 Generating team member avatars using Gemini 3 Pro Image...')
  console.log('')

  let successCount = 0
  let failCount = 0

  for (const member of teamMembers) {
    console.log(`🎨 Generating for ${member.name} (${member.role})...`)
    const success = await generateAvatar(member)

    if (success) {
      successCount++
    } else {
      failCount++
    }

    // 添加延迟避免速率限制
    if (member.id !== teamMembers[teamMembers.length - 1].id) {
      console.log('⏳ Waiting 3 seconds to avoid rate limit...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  console.log('')
  console.log('='.repeat(50))
  console.log(`✨ Avatar generation complete!`)
  console.log(`✅ Success: ${successCount}/${teamMembers.length}`)
  console.log(`❌ Failed: ${failCount}/${teamMembers.length}`)
  console.log('='.repeat(50))
  console.log('')
  console.log('💡 Next steps:')
  console.log('1. Push code to GitHub')
  console.log('2. Connect repository to Vercel')
  console.log('3. Deploy to Vercel')
}

main().catch(console.error)
