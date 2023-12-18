'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import useProductContext from '@/contexts/ProductContext'
import useCartContext from '@/contexts/CartContext'

export default function useGlobalSearch(value: string) {
  const pathname = usePathname()
  const { filter: productFilter, list, setProduct } = useProductContext()
  const { products, filter, setOrder } = useCartContext()

  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)

  useEffect(() => {
    if (value) setFilter()
    else clearFilter()
  }, [value, list, products])

  useEffect(() => {
    clearFilter()
  }, [pathname])

  const clearFilter = () => {
    if (filter) setOrder({ filter: '' })
    if (productFilter) setProduct({ filter: '' })
  }

  const setFilter = () => {
    console.count()
    clearTimeout(timeoutRef.current as NodeJS.Timeout)

    timeoutRef.current = setTimeout(() => {
      if (pathname === '/' || pathname === '/products') setProduct({ filter: value })
      else if (pathname === '/cart') setOrder({ filter: value })
    }, 500)
  }
}
