import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { CartContextProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Products showcase',
  description: 'Products showcase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><CartContextProvider>{children}</CartContextProvider></body>
    </html>
  )
}
