import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })

export async function GET(req: Request): Promise<NextResponse<{ url: string }>> {
  const sessionId= 'cs_test_a1RTWEdg4fY76PMOj9UqZsmwh5QYtT2dRPX396xDDaJJkP6JDri0mAW47B' // from db by

  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions`

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: returnUrl,
    })

    return NextResponse.json({ url: portalSession.url! })
  } catch (error) {
    console.log(error)

    return NextResponse.json(error as any, { status: 400 })
  }
}
