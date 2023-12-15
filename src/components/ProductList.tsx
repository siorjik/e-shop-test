'use client'

import { useCallback, useEffect } from 'react'

import ProductCard from './ProductCard'

import useCartContext from '@/contexts/CartContext'
import useProductContext from '@/contexts/ProductContext'
import { ProductType } from '@/types/ProductTypes'

export default function ProductList({ data }: { data: ProductType[] }) {
  const { products, setOrder } = useCartContext()
  const { list, filter, setProduct } = useProductContext()

  useEffect(() => {
    if (!filter) setProduct({ list: data })
    else setProduct({ list: data.filter(item => item.title.toLowerCase().includes(filter)) })
  }, [data, filter])

  const action = useCallback((data: ProductType) => {
    setOrder({ products: [...products, data] })
  }, [products])

  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(205px,_1fr))] gap-3'>
      {list && list.map(item => <ProductCard key={item.id} data={item} func={action} />)}
    </div>
  )
}
