'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import useCartContext from '@/contexts/CartContext'

export default function TransactionSuccess() {
  const { setOrder, sum } = useCartContext()

  useEffect(() => {
    if (sum) setOrder({ products: [], filter: '', sum: 0 })
  }, [setOrder])

  return (
    <div className='h-[100dvh] flex-col flex items-center justify-center'>
      <h1 className='text-3xl text-orange-400'>Your order was accepted! Thanks for your purchases!</h1>
      <Link className='green-btn' href='/'>
        Go to continue shopping
      </Link>
    </div>
  )
}