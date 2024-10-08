'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import ProductCard from './ProductCard'
import Spinner from './Spinner'

import { useCartContext, useCartActionsContext } from '@/contexts/CartContext'
import { useProductContext, useProductActionsContext } from '@/contexts/ProductContext'
import { ProductType } from '@/types/ProductTypes'

export default function ProductList({ data }: { data: ProductType[] }) {
  const [isShowLoader, setShowLoader] = useState(false)
  const [isShowSpinner, setShowSpinner] = useState(false)

  const { products } = useCartContext()
  const { setOrder } = useCartActionsContext()
  const { list, filter } = useProductContext()
  const { setProduct } = useProductActionsContext()

  useEffect(() => {
    if (filter) {
      setProduct({ list: data, filter })
    } else setProduct({ list: data || [] })

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
      {
        isShowLoader ? <Spinner /> :
          data.length && filter && !list.length ? <h4 className='mt-10 text-center'>No products were found by filter...</h4> :
            <div className='grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3'>
              {list && list.map(item => <ProductCard key={item.id} data={item} func={action} />)}
              {isShowSpinner && <Spinner style='client-spinner' />}
            </div>
      }
    </>
  )
}
