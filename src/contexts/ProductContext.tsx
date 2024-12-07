'use client'

import { createContext, useContext, useState, useMemo, useCallback } from 'react'

import { ProductType } from '@/types/ProductTypes'

export type ProductValueContextType = { list: ProductType[] | [], data: ProductType | {}, filter: string }
export type ProductActionsContextType = { setProduct: (data: Partial<ProductValueContextType>) => void }

const ProductContext = createContext<ProductValueContextType>({ list: [], data: {}, filter: '' })
const ProductActionsContext = createContext<ProductActionsContextType>({ setProduct: () => { } })

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<ProductValueContextType>({ list: [], data: {}, filter: '' })

  const setProduct = useCallback((data: Partial<ProductValueContextType>) => {
    if (data.filter && data.list) {
      setContext({
        ...context, ...data,
        list: data.list!.filter(item => item.title.toLowerCase().includes(data.filter!.toLowerCase()))
      })
    } else setContext({ ...context, ...data })
  }, [])

  const value = useMemo(() => ({ ...context }), [context])
  const actions = useMemo(() => ({ setProduct }), [setProduct])

  return (
    <ProductContext.Provider value={{ ...value }}>
      <ProductActionsContext.Provider value={{ ...actions }}>
        {children}
      </ProductActionsContext.Provider>
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
export const useProductActionsContext = () => useContext(ProductActionsContext)
