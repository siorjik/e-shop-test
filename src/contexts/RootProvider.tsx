'use client'

import { ReactNode } from 'react'
import { CartContextProvider } from './CartContext'
import { ProductContextProvider } from './ProductContext'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <ProductContextProvider>
        {children}
      </ProductContextProvider>
    </CartContextProvider>
  )
}
