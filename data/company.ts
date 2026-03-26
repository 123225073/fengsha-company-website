export interface CompanyInfo {
  name: string
  slogan: string
  description: string
  vision: string
  mission: string
  contact: {
    phone: string
    wechat: string
  }
  social: {
    wechat: {
      name: string
    }
    csdn: {
      userId: string
      username: string
      url: string
    }
  }
}

export const companyInfo: CompanyInfo = {
  name: "风沙一人创业公司",
  slogan: "AI驱动的虚拟科技创业公司",
  description: "聚焦SaaS工具、自媒体、AI应用三大赛道",
  vision: "建立完备的虚拟AI公司矩阵，实现财务自由",
  mission: "以AI为核心，打造可持续发展的科技产品生态",
  contact: {
    phone: "13719304891",
    wechat: "Love_Gws_1314",
  },
  social: {
    wechat: {
      name: "风沙实战营",
    },
    csdn: {
      userId: "qq_40141758",
      username: "风_沙",
      url: "https://blog.csdn.net/qq_40141758",
    },
  },
}
