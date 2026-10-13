export type FrameColor = {
  id: string
  name: string
  hex: string
  accent: string
}

export type LensOption = {
  id: string
  name: string
  description: string
  price: number
}

export type AiPack = {
  id: string
  name: string
  description: string
  price: number
}

export type Product = {
  id: string
  name: string
  tagline: string
  price: number
  badge?: string
  description: string
  highlights: string[]
}

export type CartItem = {
  id: string
  productId: string
  name: string
  unitPrice: number
  quantity: number
  frameColor: FrameColor
  lens: LensOption
  aiPack: AiPack
}

export type CheckoutData = {
  name: string
  email: string
  phone: string
  cep: string
  address: string
  city: string
  state: string
  payment: 'pix' | 'card'
}
