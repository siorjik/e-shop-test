'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { useCartContext, useCartActionsContext } from '@/contexts/CartContext'

export default function TransactionSuccess() {
  const { sum } = useCartContext()
  const { setOrder } = useCartActionsContext()

  useEffect(() => {
    if (sum) setOrder({ products: [], filter: '', sum: 0 })
  }, [setOrder])

  return (
    <div className='h-[100dvh] px-5 flex-col flex items-center justify-center'>
      <h1 className='mb-10 text-center text-3xl text-orange-400'>Your order was accepted! Thanks for your purchases!</h1>
      <Link className='green-btn' href='/'>
        Go to continue shopping
      </Link>
    </div>
  )
}