import { notFound } from 'next/navigation'

import { ProductType } from '@/types/ProductTypes'
import ProductList from '@/components/ProductList'
import CategoryList from '@/components/CategoryList'

async function getProducts(query: string = ''): Promise<{ products: ProductType[], categories: string[] } | { error: Error }> {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    //const res = await fetch('https://api.escuelajs.co/api/v1/products')

    if (!res.ok) throw new Error(`Something went wrong, error: ${res.status}`)

    let products: ProductType[] = await res.json()

    const getCategories = () => Array.from(new Set(products.map(item => item.category)))
    const categories = getCategories()

    if (query) products = products.filter(item => query.split(',').find(q => q === item.category))

    return { products, categories }
  } catch (err) {
    const error = err as Error

    return { error }
  }
}

export default async function Products({ searchParams }: { searchParams: { categories: string } }) {
  const res = await getProducts(searchParams.categories)

  if ('error' in res) notFound()

  return (
    <>
      {res.products && res.products.length && <div className='grid md:grid-cols-[165px,1fr] gap-5 md:gap-20'>
        <CategoryList list={res.categories} query={searchParams.categories} />
        <ProductList data={res.products} />
      </div>}
    </>
  )
}
