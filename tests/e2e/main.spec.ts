import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // 检查标题
    await expect(page).toHaveTitle(/风沙一人创业公司/)

    // 检查 Hero 区域
    await expect(page.locator('#home')).toBeVisible()
    await expect(page.locator('h1')).toContainText('风沙一人创业公司')
  })

  test('should navigate to sections', async ({ page }) => {
    await page.goto('/')

    // 测试导航栏链接
    await page.click('text=关于')
    await expect(page.locator('#about')).toBeVisible()

    await page.click('text=团队')
    await expect(page.locator('#team')).toBeVisible()

    await page.click('text=产品')
    await expect(page.locator('#products')).toBeVisible()

    await page.click('text=博客')
    await expect(page.locator('#blog')).toBeVisible()

    await page.click('text=联系')
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')

    // 检查默认深色主题
    await expect(page.locator('html')).toHaveClass(/dark/)

    // 点击主题切换按钮
    await page.click('[aria-label="toggle theme"]')

    // 检查切换到浅色主题
    await expect(page.locator('html')).toHaveClass(/light/)
  })

  test('should display team members', async ({ page }) => {
    await page.goto('/')
    await page.locator('#team').scrollIntoViewIfNeeded()

    // 检查团队成员显示
    const teamMembers = page.locator('[id="team"] > div > div > div')
    await expect(teamMembers).toHaveCount(7)

    // 检查特定成员
    await expect(teamMembers).toContainText('小风')
    await expect(teamMembers).toContainText('灵犀')
    await expect(teamMembers).toContainText('司南')
  })

  test('should submit contact form', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    // 填写表单
    await page.fill('input[name="name"]', '测试用户')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', '这是一条测试消息')

    // 提交表单（会被 alert 阻止，需要处理）
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('感谢您的留言')
      dialog.accept()
    })

    await page.click('button[type="submit"]')
  })
})
