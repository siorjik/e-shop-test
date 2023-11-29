'use client'

import { ProductType } from '@/types/ProductTypes'
import useCartContext from '@/contexts/CartContext'

export default function CartBtn({ title, product }: { title: string, product: ProductType }) {
  const { products, setContext } = useCartContext()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    setContext({ products: [...products, product] })
  }

  return (
    <button
      className='px-5 py-3 rounded-lg bg-slate-200 hover:bg-slate-300 transition-all'
      onClick={onClick}
    >{title}</button>
  )
}
