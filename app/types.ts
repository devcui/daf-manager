export interface Role {
  characNo: number
  characName: string
}

export interface Equipment {
  id: number
  name: string
  mainCategory: string
  subCategory: string
  subSubCategory: string
  level: string
  rarity: string
}

export interface Tools {
  id: number
  name: string
  originalCategory: string
  type: string
  usageLevel: string
  rarity: any
}

export interface Email {
  // 接收人ID(角色ID)
  receiveCharacNo: string
  // 物品附件ID
  itemId: number
  // 物品数量
  addInfo: number
  // 物品强化等级
  upgrade?: number
  // 红字属性类型'空-0', '异次元体力-1', '异次元精神-2', '异次元力量-3', '异次元智力-4'
  amplifyOption?: number
  // 红字属性值
  amplifyValue?: number
  // 金币数量
  gold?: number
  // 邮件内物品是否是封装（ss禁止封装）
  sealFlag?: boolean
  // 物品锻造等级
  seperateUpgrade?: number
  name?: string
  index?: number
}
export interface EuipmentQuery {
  keyword: string
  pageNum: number
  pageSize: number
}

export interface ToolsQuery {
  keyword: string
  pageNum: number
  pageSize: number
}

export interface Page<T> {
  current: number
  pages: number
  records: T[]
  size: number
  total: number
}
