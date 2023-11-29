'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type CartContextType = { products: ProductType[] }

const CartContext = createContext<CartContextType & { setContext: Dispatch<SetStateAction<CartContextType>> }>
  ({ products: [], setContext: (): CartContextType => ({ products: [] }) })

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<CartContextType>({ products: [] })

  return (
    <CartContext.Provider value={{ ...context, setContext }}>
      {children}
    </CartContext.Provider>
  )
}

export default () => useContext(CartContext)
