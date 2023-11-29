import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart page',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
