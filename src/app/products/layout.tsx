import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
