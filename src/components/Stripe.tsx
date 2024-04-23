'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

import Button from '@/components/Button'
import Spinner from './Spinner'

export default function Stripe({ sum }: { sum: number }) {
  const [errorMessage, setErrorMessage] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()

    if (submitError) return

    const resp = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: sum })
    })

    if (!resp.ok) return setErrorMessage('Error processing payment')

    const { clientSecret } = await resp.json()

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'http://localhost:3000/transaction-success' },
      clientSecret,
    })

    if (error) setErrorMessage(error.message as string)
  }

  return (
    <>
      {!stripe || !elements ? <Spinner /> : null}
      <form onSubmit={onSubmit}>
        <PaymentElement />
        <Button
          type='submit'
          style={`
            mx-auto mt-10 block w-4/5 md:w-2/5 py-2 text-white text-2xl
            rounded-lg bg-fuchsia-300 hover:bg-fuchsia-500 transition-all
          `}
        >Pay</Button>
      </form>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </>
  )
}
