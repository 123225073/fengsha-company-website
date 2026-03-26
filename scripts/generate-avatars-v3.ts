const API_KEY = 'AIzaSyAGKws6fnELYvfihxZPy0eBX5zb3aaTN7E';

const teamMembers = [
  {
    id: 'main',
    name: '小风',
    role: 'CEO',
    emoji: '🧠',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "小风", who is CEO at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with business suit and tie. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'lingxi',
    name: '灵犀',
    role: '产品合伙人',
    emoji: '💡',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "灵犀", who is Product Partner at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with designer outfit. The lobster holds product prototype board or creative sketch. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'sinan',
    name: '司南',
    role: '架构合伙人',
    emoji: '🧭',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "司南", who is Architecture Partner at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with engineer outfit. The lobster holds architecture diagram or tech device. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'warp',
    name: '跃迁',
    role: '研发合伙人',
    emoji: '🚀',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "跃迁", who is Development Partner at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with programmer t-shirt. The lobster holds laptop or code screen. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'frost',
    name: '霜刃',
    role: '质量安全合伙人',
    emoji: '🗡️',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "霜刃", who is QA and Security Partner at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with tester outfit. The lobster holds magnifying glass or shield. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'mobius',
    name: '莫比乌斯',
    role: '运维合伙人',
    emoji: '♾️',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "莫比乌斯", who is Operations Partner at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with DevOps outfit. The lobster holds server or network icons. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
  {
    id: 'zhuge',
    name: '诸葛',
    role: '知识沉淀师',
    emoji: '📚',
    prompt: 'Create a cute chibi-style lobster character as a mascot for "诸葛", who is Knowledge Manager at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform with scholar outfit. The lobster holds book or knowledge graph. The lobster has a cute, friendly expression looking at camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.'
  },
];

interface GenerationResult {
  success: boolean
  member: typeof teamMembers[0]
  imageBase64?: string
  error?: string
}

async function generateAvatar(member: typeof teamMembers[0]): Promise<GenerationResult> {
  try {
    console.log(`🎨 Generating for ${member.name} (${member.role})...`)

    const requestBody = {
      contents: [
        {
          parts: [
            { text: member.prompt }
          ]
        }
      ]
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ HTTP ${response.status}: ${errorText}`)
      return {
        success: false,
        member,
        error: `HTTP ${response.status}: ${errorText}`
      }
    }

    const data = await response.json()

    if (data.candidates && data.candidates.length > 0) {
      const parts = data.candidates[0].content.parts
      let base64Data: string | null = null
      let mimeType = 'image/jpeg'

      // 遍历 parts 寻找图片数据
      for (const part of parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data
          if (part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType
          }
          break
        }
      }

      if (base64Data) {
        const imageBase64 = `data:${mimeType};base64,${base64Data}`

        // 保存图片到 public/images/team/ 目录
        const fs = require('fs')
        const path = require('path')

        const outputPath = path.join(process.cwd(), 'public', 'images', 'team', `${member.id}.png`)

        // 确保目录存在
        const dir = path.dirname(outputPath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        // 从base64提取纯数据
        const matches = imageBase64.match(/^data:(.*);base64,(.+)$/)
        if (matches && matches[2]) {
          const pureBase64 = matches[2]
          const buffer = Buffer.from(pureBase64, 'base64')
          fs.writeFileSync(outputPath, buffer)
        }

        console.log(`✅ Generated avatar for ${member.name}: ${outputPath}`)
        return {
          success: true,
          member,
          imageBase64: imageBase64
        }
      } else {
        return {
          success: false,
          member,
          error: 'No image data found in response'
        }
      }
    } else {
      return {
        success: false,
        member,
        error: 'No candidates found in response'
      }
    }
  } catch (error: any) {
    console.error(`❌ Error generating avatar for ${member.name}:`, error)
    return {
      success: false,
      member,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

async function main() {
  console.log('🦞 Generating team member avatars using Gemini 3 Pro Image...')
  console.log('')

  const results: GenerationResult[] = []

  for (const member of teamMembers) {
    const result = await generateAvatar(member)
    results.push(result)

    // 添加延迟避免速率限制（3秒）
    if (member.id !== teamMembers[teamMembers.length - 1].id) {
      console.log('⏳ Waiting 3 seconds to avoid rate limit...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  console.log('')
  console.log('='.repeat(50))
  console.log(`✨ Avatar generation complete!`)
  console.log(``.repeat(50))
  console.log('')

  const successCount = results.filter(r => r.success).length
  const failCount = results.length - successCount

  console.log(`✅ Success: ${successCount}/${results.length}`)
  console.log(`❌ Failed: ${failCount}/${results.length}`)
  console.log('')

  if (failCount > 0) {
    console.log('⚠️  Failed members:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.member.name}: ${r.error}`)
    })
  }

  if (successCount === 0) {
    console.log('⚠️ All generations failed. Team component will use emojis as fallback.')
    console.log('')
    console.log('💡 Next steps:')
    console.log('1. Update Team component to use generated avatars')
    console.log('2. Commit and push to GitHub')
    console.log('3. Connect to Vercel to deploy')
    console.log('4. Deploy to Vercel')
  } else {
    console.log('💡 Next steps:')
    console.log('1. Commit changes: git add public/images/team/ && git commit -m "feat: add team member avatars"')
    console.log('2. Push to GitHub: git push')
    console.log('3. Connect to Vercel to deploy')
    console.log('4. Deploy to Vercel')
  }

  // 生成总结报告
  const report = {
    timestamp: new Date().toISOString(),
    results: results,
    summary: {
      total: results.length,
      success: successCount,
      failed: failCount
    }
  }

  const fs = require('fs')
  const path = require('path')

  const reportPath = path.join(process.cwd(), 'avatar-generation-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`📝 Report saved to: ${reportPath}`)
}

main().catch(console.error)
