'use client'

import { ProductType } from '@/types/ProductTypes'
import useCartContext from '@/contexts/CartContext'

export default function CartBtn({ title, product }: { title: string, product: ProductType }) {
  const { products, setOrder } = useCartContext()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    setOrder({ products: [...products, product] })
  }

  return (
    <button
      className='px-5 py-3 rounded-lg bg-slate-200 hover:bg-slate-300 transition-all'
      onClick={onClick}
    >{title}</button>
  )
}
