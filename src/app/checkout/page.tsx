'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Stripe from '@/components/Stripe'

import useCartContext from '@/contexts/CartContext'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
  const { sum } = useCartContext()

  const options = {
    mode: 'payment' as const,
    amount: +(sum * 100).toFixed(2),
    currency: 'usd',
    locale: 'en' as const,
  }

  return (
    <div className='flex flex-col lg:flex-row justify-between'>
      <div className='w-[47%] mb-10'>
        <h2 className='mb-10 text-3xl font-semibold'>${sum}</h2>
        <p className='mb-3 text-lg'>Delivery:</p>
        <p>in progress...</p>
      </div>
      <div className='w-[47%] mb-10'>
        <Elements stripe={stripePromise} options={options}>
          <Stripe sum={sum} />
        </Elements>
      </div>
    </div>
  )
}
