'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { ProductType } from '@/types/ProductTypes'
import useCartContext from '@/contexts/CartContext'
import cart from '@/../public/cart.svg'
import Button from './Button'
import Spinner from './Spinner'

export default function ProductInfo({ data }: { data: ProductType }) {
  const [isShowSpinner, setShowSpinner] = useState(false)

  const { image, title, description, price } = data

  const { products, setOrder } = useCartContext()

  useEffect(() => {
    if (isShowSpinner) setTimeout(() => setShowSpinner(!isShowSpinner), 300)
  }, [isShowSpinner])

  return (
    <>
      <div className='flex flex-col md:flex-row lg:grid lg:grid-cols-[1fr,2fr] lg:gap-8'>
        <Image
          width={100} height={100} src={image} alt={image} className='mx-auto mb-10 h-56 w-52 md:h-80 md:w-96 md:mx-0 lg:mx-0'
        />
        <div className="flex flex-col md:ml-10 lg:grid lg:grid-cols-[2fr,1fr] lg:gap-8 lg:ml-0">
          <div>
            <h2 className='mb-10 text-3xl text-center'>{title}</h2>
            <p className=''>{description}</p>
          </div>
          <div className="mt-20 flex justify-around items-center lg:flex-col lg:justify-start lg:mt-0">
            <h2 className='text-2xl font-semibold'>${price}</h2>
            <Button
              style='px-10 py-3 rounded-lg bg-slate-200 hover:bg-slate-300 transition-all lg:mt-5'
              click={() => {
                setOrder({ products: [...products, data] })

                setShowSpinner(true)
              }}
            ><Image src={cart} alt='cart' /></Button>
          </div>
        </div>
      </div>
      {isShowSpinner && <Spinner style='bg-violet-200/[0.5]' />}
    </>
  )
}
