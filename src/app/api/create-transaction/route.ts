import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import getFormatAmount from '@/helpers/getFormatAmount'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })

export async function POST(req: Request): Promise<NextResponse<{ clientSecret: string } | any>> {
  const body = await req.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: getFormatAmount(body.amount),
      currency: 'usd',
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret! })
  } catch (error) {
    console.log(error)

    return NextResponse.json(error as any, { status: 400 })
  }
}
