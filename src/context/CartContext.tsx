import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AiPack, CartItem, FrameColor, LensOption, Product } from '../types'

type CartContextValue = {
  items: CartItem[]
  addItem: (payload: {
    product: Product
    frameColor: FrameColor
    lens: LensOption
    aiPack: AiPack
    quantity?: number
  }) => void
  updateQty: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clear: () => void
  count: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'visora-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue['addItem'] = ({
      product,
      frameColor,
      lens,
      aiPack,
      quantity = 1,
    }) => {
      const unitPrice = product.price + lens.price + aiPack.price
      const signature = `${product.id}-${frameColor.id}-${lens.id}-${aiPack.id}`
      setItems((prev) => {
        const existing = prev.find((item) => item.id === signature)
        if (existing) {
          return prev.map((item) =>
            item.id === signature
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }
        return [
          ...prev,
          {
            id: signature,
            productId: product.id,
            name: product.name,
            unitPrice,
            quantity,
            frameColor,
            lens,
            aiPack,
          },
        ]
      })
    }

    return {
      items,
      addItem,
      updateQty: (id, quantity) => {
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((item) => item.id !== id)
            : prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
        )
      },
      removeItem: (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
      clear: () => setItems([]),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
