'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type CartValueContextType = { products: ProductType[], filter: string, sum: number }
export type CartActionsContextType = { setOrder: (data: { [k: string]: ProductType[] | string | number }) => void }

const CartValueContext = createContext<CartValueContextType>({ products: [], filter: '', sum: 0 })
const CartActionsContext = createContext<CartActionsContextType>({ setOrder: () => { } })

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<CartValueContextType>({ products: [], filter: '', sum: 0 })

  useEffect(() => {
    if (window.localStorage.getItem('cart')) {
      const products = JSON.parse(window.localStorage.getItem('cart')!)

      const sum = getTotalSum(products)

      setOrder({ ...context, products, sum })
    }
  }, [])

  const getTotalSum = useMemo(() => (products: ProductType[]): number => {
    let sum = 0

    products.forEach(item => sum += item.price)

    return +sum.toFixed(2)
  }, [context.products])

  const setOrder = useCallback((data: { [k: string]: ProductType[] | string | number }) => {
    if ('products' in data) {
      window.localStorage.setItem('cart', JSON.stringify(data.products))

      data = { ...data, sum: getTotalSum(data.products as ProductType[]) }
    }

    setContext({ ...context, ...data })
  }, [])

  const value = useMemo(() => ({ ...context }), [context])
  const actions = useMemo(() => ({ setOrder }), [setOrder])

  return (
    <CartValueContext.Provider value={{ ...value }}>
      <CartActionsContext.Provider value={{ ...actions }}>
        {children}
      </CartActionsContext.Provider>
    </CartValueContext.Provider>
  )
}

export const useCartContext = () => useContext(CartValueContext)
export const useCartActionsContext = () => useContext(CartActionsContext)
