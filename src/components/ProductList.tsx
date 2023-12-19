'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import ProductCard from './ProductCard'
import Spinner from './Spinner'

import useCartContext from '@/contexts/CartContext'
import useProductContext from '@/contexts/ProductContext'
import { ProductType } from '@/types/ProductTypes'

export default function ProductList({ data }: { data: ProductType[] }) {
  const [isShowLoader, setShowLoader] = useState(false)
  const [isShowSpinner, setShowSpinner] = useState(false)

  const { products, setOrder } = useCartContext()
  const { list, filter, setProduct } = useProductContext()

  useEffect(() => {
    if (!filter) setProduct({ list: data })
    else setProduct({ list: data.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())) })

    setLoader
  }, [data, filter])

  useEffect(() => {
    if (isShowLoader) setTimeout(() => setShowLoader(!isShowLoader), 500)
    if (isShowSpinner) setTimeout(() => setShowSpinner(!isShowSpinner), 300)
  }, [isShowLoader, isShowSpinner])

  const action = useCallback((data: ProductType) => {
    setOrder({ products: [...products, data] })

    setShowSpinner(true)
  }, [products])

  const setLoader = useMemo(() => setShowLoader(true), [list])

  return (
    <>
      {isShowLoader ? <Spinner /> :
        data.length && filter && !list.length ? <h4 className='mt-10 text-center'>No products were found by filter...</h4> :
          <div className='grid grid-cols-[repeat(auto-fill,_minmax(205px,_1fr))] gap-3'>
            {list && list.map(item => <ProductCard key={item.id} data={item} func={action} />)}
            {isShowSpinner && <Spinner style='bg-fuchsia-200/[0.5]' />}
          </div>}
    </>
  )
}
