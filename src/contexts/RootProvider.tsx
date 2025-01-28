'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import { CartContextProvider } from './CartContext'
import { ProductContextProvider } from './ProductContext'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <CartContextProvider>
        <ProductContextProvider>
          {children}
        </ProductContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  )
}
