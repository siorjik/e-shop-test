import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | void>  {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)

    if (!res.ok) throw new Error(`Something went wrong, error: ${res.status}`)

    const product = await res.json()

    return { title: `${product.title}`, description: `${product.description}` }
  } catch (error) {
    const err = error as Error

    console.log(err.message)
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
