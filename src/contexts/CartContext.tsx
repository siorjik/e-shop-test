'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type CartContextType = { products: ProductType[], filter: string }

const CartContext = createContext<CartContextType & { setOrder: (data: { [k:string]: ProductType[] | string }) => void }>
  ({ products: [], filter: '', setOrder: () => {} })

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<CartContextType>({ products: [], filter: '' })

  useEffect(() => {
    if (window.localStorage.getItem('cart')) {
      const products = JSON.parse(window.localStorage.getItem('cart')!)

      setOrder({ ...context, products })
    }
  }, [])

  const setOrder = (data: { [k:string]: ProductType[] | string }) => {
    if ('products' in data) window.localStorage.setItem('cart', JSON.stringify(data.products))

    setContext({ ...context, ...data })
  }

  return (
    <CartContext.Provider value={{ ...context, setOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export default () => useContext(CartContext)
