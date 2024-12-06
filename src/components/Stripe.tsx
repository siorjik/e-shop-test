'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

import Button from '@/components/Button'
import Spinner from './Spinner'
import apiService from '@/services/apiService'

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export default function Stripe({ sum }: { sum: number }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isProgress, setProgress] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()

    if (submitError) return

    setProgress(true)

    try {
      const resp =
        await apiService<{ clientSecret: string }>({ url: '/api/create-transaction', method: 'POST', body: { amount: sum } })

      const { clientSecret } = resp

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${appUrl}/transaction-success` },
        clientSecret,
      })

      if (error) throw error
    } catch (err) {
      const error = err as Error

      setErrorMessage(error.message)
      setProgress(false)
    }
  }

  return (
    <>
      {!stripe || !elements ? <Spinner /> : null}
      <form onSubmit={onSubmit}>
        <PaymentElement />
        <Button
          type='submit'
          disabled={isProgress}
          style={`
            mx-auto mt-10 block w-4/5 md:w-2/5 py-2 text-white text-2xl
            rounded-lg bg-fuchsia-300 hover:bg-fuchsia-500
            ${isProgress ? 'bg-fuchsia-100 hover:bg-fuchsia-100' : ''} transition-all
          `}
        >Pay{isProgress ? '...' :  null}</Button>
      </form>

      {errorMessage && <p className='mt-10 mb-5 text-center text-red-500'>{errorMessage}</p>}
    </>
  )
}
