'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type CartContextType = { products: ProductType[], filter: string, sum: number }

const CartContext = createContext<CartContextType & { setOrder: (data: { [k:string]: ProductType[] | string | number }) => void }>
  ({ products: [], filter: '', setOrder: () => {}, sum: 0 })

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<CartContextType>({ products: [], filter: '', sum: 0 })

  useEffect(() => {
    if (window.localStorage.getItem('cart')) {
      const products = JSON.parse(window.localStorage.getItem('cart')!)

      const sum = getTotalSum(products)

      setOrder({ ...context, products, sum })
    }
  }, [])

  const getTotalSum = (products: ProductType[]): number => {
    let sum = 0

    products.forEach(item => sum += item.price)

    return +sum.toFixed(2) 
  }

  const setOrder = (data: { [k:string]: ProductType[] | string | number }) => {
    if ('products' in data) {
      window.localStorage.setItem('cart', JSON.stringify(data.products))

      data = { ...data, sum: getTotalSum(data.products as ProductType[]) }
    }

    setContext({ ...context, ...data })
  }

  return (
    <CartContext.Provider value={{ ...context, setOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export default () => useContext(CartContext)
