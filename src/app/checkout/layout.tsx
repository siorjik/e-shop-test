import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Checkout page',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
