import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })

export async function POST(req: Request): Promise<NextResponse<{ status: string }>> {
  const body = await req.json()

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(body.sessionId)

    const result = { // insert to db
      status: checkoutSession.status,
      subscription: checkoutSession.subscription,
      customer: checkoutSession.customer,
      sessionId: checkoutSession.id
    }

    return NextResponse.json({ status: result.status! })
  } catch (error) {
    console.log(error)

    return NextResponse.json(error as any, { status: 400 })
  }
}
