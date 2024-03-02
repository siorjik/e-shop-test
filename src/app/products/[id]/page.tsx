import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import home from '@/../public/home.svg'

import { ProductType } from '@/types/ProductTypes'
import ProductInfo from '@/components/ProductInfo'

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products')

    if (!res.ok) throw new Error(`Something went wrong, error: ${res.status}`)
    
    
    const products = await res.json()

    return products.map((item: ProductType) => ({ id: `${item.id}` }))
  } catch (err) {
    const error = err as Error

    console.log(error)

    return []
  }
}

async function getProduct(id: string): Promise<ProductType | { error: Error }> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    //const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)

    if (!res.ok) throw new Error(`Something went wrong, error: ${res.status}`)

    const product = await res.json()

    return product
  } catch (err) {
    const error = err as Error

    return { error }
  }
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if ('error' in product) notFound()

  return (
    <>
      <Link href='/'><Image src={home} alt='home' /></Link>
      {product && <div className='mt-10'><ProductInfo data={product} /></div>}
    </>
  )
}
