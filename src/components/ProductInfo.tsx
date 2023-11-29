'use client'

import Image from 'next/image'

import { ProductType } from '@/types/ProductTypes'
import useCartContext from '@/contexts/CartContext'
import cartIcon from '@/../public/cartIcon.svg'
import Button from './Button'

export default function ProductInfo({ data }: { data: ProductType }) {
  const { image, title, description, price } = data

  const { products, setContext } = useCartContext()

  return (
    <div className='flex flex-col md:flex-row'>
      <Image 
        width={100} height={100} src={image} alt={image} className='mx-auto mb-10 h-56 w-52 md:h-80 md:w-80 md:mx-0'
      />
      <div className="flex flex-col md:ml-10">
        <h2 className='mb-10 text-3xl text-center'>{title}</h2>
        <p className=''>{description}</p>
        <div className="mt-20 flex justify-around items-center">
          <span className='text-2xl'>${price}</span>
          <Button
            style='px-5 py-3 rounded-lg bg-slate-200 hover:bg-slate-300 transition-all'
            click={() => setContext({ products: [...products, data] })}
          ><Image src={cartIcon} alt='cart' /></Button>
        </div>
      </div>
    </div>
  )
}
