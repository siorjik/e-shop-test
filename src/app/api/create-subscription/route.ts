import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })

const appUrl = process.env.NEXT_PUBLIC_APP_URL
export async function POST(req: Request): Promise<NextResponse<{ url: string; sessionId: string }>> {
  const body = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/subscriptions?success=true&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscriptions?canceled=true`,
    })

    return NextResponse.json({ url: session.url!, sessionId: session.id })
  } catch (error) {
    console.log(error)

    return NextResponse.json(error as any, { status: 400 })
  }
}
