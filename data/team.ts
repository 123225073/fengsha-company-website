export interface TeamMember {
  id: string
  name: string
  emoji: string
  role: string
  description: string
  skills: string[]
  avatar: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "main",
    name: "小风",
    emoji: "🧠",
    role: "CEO、全局调度",
    description: "任务分发、结果汇总、全局决策、团队协作协调",
    skills: ["全局调度", "任务分发", "团队协调"],
    avatar: "/images/team/main.png",
  },
  {
    id: "lingxi",
    name: "灵犀",
    emoji: "💡",
    role: "产品合伙人",
    description: "需求梳理、PRD输出、竞品分析、用户研究、ROI评估",
    skills: ["需求分析", "PRD", "竞品分析", "用户研究"],
    avatar: "/images/team/lingxi.png",
  },
  {
    id: "sinan",
    name: "司南",
    emoji: "🧭",
    role: "架构合伙人",
    description: "技术选型、系统架构设计、数据库设计、API规范制定",
    skills: ["架构设计", "数据库", "技术选型"],
    avatar: "/images/team/sinan.png",
  },
  {
    id: "warp",
    name: "跃迁",
    emoji: "🚀",
    role: "研发合伙人",
    description: "前后端开发、服务部署、性能优化、BUG修复",
    skills: ["前端", "后端", "部署", "性能优化"],
    avatar: "/images/team/warp.png",
  },
  {
    id: "frost",
    name: "霜刃",
    emoji: "🗡️",
    role: "质量安全合伙人",
    description: "功能测试、安全扫描、性能压测、代码审计",
    skills: ["测试", "安全扫描", "性能测试"],
    avatar: "/images/team/frost.png",
  },
  {
    id: "mobius",
    name: "莫比乌斯",
    emoji: "♾️",
    role: "运维合伙人",
    description: "WSL环境适配、底层依赖配置、OpenClaw插件维护、系统问题排查",
    skills: ["运维", "系统配置", "问题排查"],
    avatar: "/images/team/mobius.png",
  },
  {
    id: "zhuge",
    name: "诸葛",
    emoji: "📚",
    role: "知识沉淀师",
    description: "顶级信息架构师，知识管理与信息检索领域专家，负责全公司知识沉淀与知识库建设",
    skills: ["知识管理", "信息检索", "文档管理"],
    avatar: "/images/team/zhuge.png",
  },
]
