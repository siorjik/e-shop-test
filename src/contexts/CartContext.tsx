'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type CartContextType = { products: ProductType[] }

const CartContext = createContext<CartContextType & { setOrder: (data: CartContextType) => void }>
  ({ products: [], setOrder: () => {} })

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<CartContextType>({ products: [] })

  useEffect(() => {
    if (window.localStorage.getItem('cart')) {
      setOrder(JSON.parse(window.localStorage.getItem('cart')!))
    }
  }, [])

  const setOrder = (data: { products: ProductType[] }) => {
    window.localStorage.setItem('cart', JSON.stringify(data))

    setContext({ ...data })
  }

  return (
    <CartContext.Provider value={{ ...context, setOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export default () => useContext(CartContext)
