'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Button from '@/components/Button'

import apiService from '@/services/apiService'

const price_10 = process.env.NEXT_PUBLIC_PRICE_ID_10!
const price_100 = process.env.NEXT_PUBLIC_PRICE_ID_100!

// ?success=true&sessionId=cs_test_a1RTWEdg4fY76PMOj9UqZsmwh5QYtT2dRPX396xDDaJJkP6JDri0mAW47B

export default function Subscriptions() {
  const [status, setStatus] = useState('')

  const params = useSearchParams()

  const sessionId = params.get('sessionId')

  useEffect(() => {
    (async () => {
      if (sessionId && !status) {
        const resp =
          await apiService<{ status: string }>({ url: '/api/confirm-subscription', method: 'POST', body: { sessionId } })
        
        setStatus(resp.status)
      }
    })()
  }, [sessionId])
  
  const handleClick = async (priceId: string) => {
    try {
      const resp = await apiService<{ url: string }>({ url: '/api/create-subscription', method: 'POST', body: { priceId } })

      window.location.href = resp.url
    } catch (error) {
      console.log(error)
    }
  }

  const changeSubscription = async () => {
    try {
      const resp = await apiService<{ url: string }>({ url: '/api/change-subscription' })
      
      window.location.href = resp.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-[100dvh] flex-col flex items-center justify-center'>
      <h1 className='text-3xl text-orange-400'>Subscriptions</h1>
      <Button style='green-btn' click={() => handleClick(price_10)}>$10</Button>
      <Button style='green-btn' click={() => handleClick(price_100)}>$100</Button>
      <Button style='green-btn bg-slate-400 hover:bg-slate-500' click={changeSubscription}>Change Subscription</Button>
    </div>
  )
}
