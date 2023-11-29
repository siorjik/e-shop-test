'use client'

import ProductCard from './ProductCard'
import { useCallback } from 'react'

import useCartContext from '@/contexts/CartContext'
import { ProductType } from '@/types/ProductTypes'

export default function ProductList({ data }: { data: ProductType[] }) {
  const { products, setContext } = useCartContext()

  const action = useCallback((data: ProductType) => {
    setContext({ products: [...products, data] })
  }, [products])

  return (
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-3'>
      {data && data.map(item => <ProductCard key={item.id} data={item} func={action} />)}
    </div>
  )
}
