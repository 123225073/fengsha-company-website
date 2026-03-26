const GEMINI_API_KEY = 'AIzaSyCHL3fahdUEih-q3Smd1Qify-0nTdsdb7X0'

const teamMembers = [
  { id: 'main', name: '小风', role: 'CEO', emoji: '🧠' },
  { id: 'lingxi', name: '灵犀', role: '产品合伙人', emoji: '💡' },
  { id: 'sinan', name: '司南', role: '架构合伙人', emoji: '🧭' },
  { id: 'warp', name: '跃迁', role: '研发合伙人', emoji: '🚀' },
  { id: 'frost', name: '霜刃', role: '质量安全合伙人', emoji: '🗡️' },
  { id: 'mobius', name: '莫比乌斯', role: '运维合伙人', emoji: '♾️' },
  { id: 'zhuge', name: '诸葛', role: '知识沉淀师', emoji: '📚' },
]

async function generateAvatar(member: typeof teamMembers[0]) {
  const prompt = `Create a cute chibi-style lobster character as a mascot for ${member.name}, who is the ${member.role} at Fengsha Company. The lobster should be standing on two legs in a movie-quality wide-angle shot. It should wear modern tech company uniform. The lobster has a cute, friendly expression looking at the camera. Style: 8K resolution, photorealistic, highly detailed shell texture, vibrant colors, warm futuristic tech atmosphere.`

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent',
      {
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
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    if (data.candidates?.length > 0) {
      const imageData = data.candidates[0].parts?.[0]?.inlineData?.data

      if (imageData) {
        const buffer = Buffer.from(imageData, 'base64')
        const fs = require('fs')
        const path = require('path')

        const outputPath = path.join(process.cwd(), 'public', 'images', 'team', `${member.id}.png`)

        const dir = path.dirname(outputPath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        fs.writeFileSync(outputPath, buffer)
        console.log(`✅ Generated avatar for ${member.name}: ${outputPath}`)
        return true
      } else {
        throw new Error(`No image data for ${member.name}`)
      }
    } else {
      throw new Error(`No candidates in response`)
    }
  } catch (error) {
    console.error(`❌ Error generating avatar for ${member.name}:`, error instanceof Error ? error.message : error)
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
      // 失败后使用 Emoji 作为后备
      console.log(`⚠️  Using emoji fallback for ${member.name}`)
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

  if (successCount === 0) {
    console.log('⚠️ All avatars failed. Team component will use emojis as fallback.')
    console.log('To use real avatars:')
    console.log('1. Check Gemini API key')
    console.log('2. Try the generate-avatars-simple.ts script with different prompts')
    console.log('3. Manually add avatar images to public/images/team/')
  } else {
    console.log('💡 Next steps:')
    console.log('1. Commit changes: git add public/images/team/ && git commit -m "feat: add team member avatars"')
    console.log('2. Push to GitHub: git push')
    console.log('3. Connect to Vercel to deploy')
  }
}

main().catch(console.error)
