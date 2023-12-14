'use client'

import { createContext, useContext, useState } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type ProductContextType = { list: ProductType[] | [], data: ProductType | {}, filter: '' }

const ProductContext =
  createContext<ProductContextType & { setProduct: (data: { [k: string]: ProductType | ProductType[] | string }) => void }>
    ({ list: [], data: {}, filter: '', setProduct: () => { } })

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<ProductContextType>({ list: [], data: {}, filter: '' })

  const setProduct = (data: { [k: string]: ProductType | ProductType[] | string }) => setContext({ ...context, ...data })

  return (
    <ProductContext.Provider value={{ ...context, setProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export default () => useContext(ProductContext)
