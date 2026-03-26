export interface Product {
  id: string
  name: string
  description: string
  tags: string[]
  icon: string
  link: string
}

export const products: Product[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "多Agent协作平台，实现AI团队协同工作",
    tags: ["协作平台", "AI", "多Agent"],
    icon: "/images/products/openclaw.png",
    link: "#",
  },
]
