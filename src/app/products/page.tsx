import { notFound } from 'next/navigation'

import { ProductType } from '@/types/ProductTypes'
import ProductList from '@/components/ProductList'

async function getProducts(): Promise<ProductType[] | { error: Error }> {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    //const res = await fetch('https://api.escuelajs.co/api/v1/products')

    if (!res.ok) throw new Error(`Something went wrong, error: ${res.status}`)

    const products = await res.json()

    return products
  } catch (err) {
    const error = err as Error

    return { error }
  }
}

export default async function Products() {
  const products = await getProducts()

  if ('error' in products) notFound()

  return (
    <>
      <h2 className='mb-10 text-2xl'>Products Page</h2>
      {products && products.length && <ProductList data={products} />}
    </>
  )
}
