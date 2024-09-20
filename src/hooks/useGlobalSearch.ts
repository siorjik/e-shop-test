'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import useProductContext from '@/contexts/ProductContext'
import { useCartContext, useCartActionsContext } from '@/contexts/CartContext'

export default function useGlobalSearch(value: string) {
  const pathname = usePathname()
  const { filter: productFilter, list, setProduct } = useProductContext()
  const { filter } = useCartContext()
  const { setOrder } = useCartActionsContext()

  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)

  useEffect(() => {
    setFilter()
  }, [value, list])

  const clearFilter = () => {
    if (filter) setOrder({ filter: '' })
    if (productFilter) setProduct({ filter: '' })
  }
  
  const setFilter = () => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)

    if (!value) clearFilter()
    else {
      timeoutRef.current = setTimeout(() => {
        if (pathname === '/' || pathname === '/products') setProduct({ filter: value })
        else if (pathname === '/cart') setOrder({ filter: value })
      }, 500)
    }
  }
}
