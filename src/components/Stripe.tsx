'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

import Button from '@/components/Button'
import Spinner from './Spinner'

export default function Stripe({ sum }: { sum: number }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()

    if (submitError) return

    setIsDisabled(true)

    const resp = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: sum })
    })

    if (!resp.ok) {
      setErrorMessage('Error processing payment')
      setIsDisabled(false)
    }

    const { clientSecret } = await resp.json()

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${process.env.NEXT_PUBLIC_APP_URL}/transaction-success` },
      clientSecret,
    })

    if (error) {
      setErrorMessage(error.message as string)
      setIsDisabled(false)
    }
  }

  return (
    <>
      {!stripe || !elements ? <Spinner /> : null}
      <form onSubmit={onSubmit}>
        <PaymentElement />
        <Button
          type='submit'
          disabled={isDisabled}
          style={`
            mx-auto mt-10 block w-4/5 md:w-2/5 py-2 text-white text-2xl
            rounded-lg bg-fuchsia-300 hover:bg-fuchsia-500
            ${isDisabled ? 'bg-fuchsia-100 hover:bg-fuchsia-100' : ''} transition-all
          `}
        >Pay</Button>
      </form>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </>
  )
}
