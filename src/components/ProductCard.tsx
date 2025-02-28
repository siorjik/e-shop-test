'use client'

import { memo, MouseEvent } from 'react'
import { Tooltip } from 'react-tooltip'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import cart from '@/../public/cart.svg'
import info from '@/../public/info.svg'

import { ProductType } from '../types/ProductTypes'

export default memo(function ProductCard({ data, func }: { data: ProductType, func: (data: ProductType) => void }) {
  const { id, title, image, description, price } = data

  const { push } = useRouter()

  return (
    <>
      <div 
        className='
          p-3 flex flex-col justify-center bg-slate-100 dark:bg-slate-500 rounded-lg shadow-[5px_5px_15px_2px_rgba(0,0,0,0.2)] 
          hover:scale-105 hover:shadow-[5px_30px_30px_2px_rgba(0,0,0,0.5)] transition-all cursor-pointer
        '
        onClick={() => push(`/products/${id}`)}
      >
        <Image
          width={100} height={100}
          className='h-32 w-32 mx-auto mb-3 object-fill cursor-pointer'
          src={image}
          alt={image}
          priority
        />
        <h3 className='mb-5 line-clamp-1 text-center font-semibold'>{title}</h3>
        <div className='flex justify-between items-center'>
          <Image data-tooltip-id={`tooltip-${id}`} src={info} alt='info' onClick={(e) => e.stopPropagation()} />
          <span>${price}</span>
          <Image src={cart} alt='cart' onClick={(e: MouseEvent<HTMLImageElement>) => {
            e.stopPropagation()

            func(data)
          }} />
        </div>
      </div>

      <Tooltip
        id={`tooltip-${id}`}
        place='top'
        content={description}
        className='tooltip'
        style={{ width: '300px', padding: '10px' }}
      />
    </>
  )
})
