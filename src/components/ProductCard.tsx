'use client'

import { memo } from 'react'
import { Tooltip } from 'react-tooltip'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ProductType } from '../types/ProductTypes'
import cartIcon from '@/../public/cartIcon.svg'
import Button from './Button'

export default memo(function ProductCard({ data, func }: { data: ProductType, func: (data: ProductType) => void }) {
  const { id, title, image, description, price } = data

  const { push } = useRouter()

  return (
    <>
      <div 
        className='p-5 flex flex-col justify-center bg-slate-100 rounded-lg shadow-[5px_5px_15px_2px_rgba(0,0,0,0.1)]
        hover:bg-lime-50 hover:m-[-10px] transition-all cursor-pointer'
        onClick={() => push(`/products/${id}`)}
      >
        <Image
          width={100} height={100}
          className='h-56 w-52 mx-auto mb-3 object-fill cursor-pointer' src={image} alt={image}
        />
        <h3
          data-tooltip-id={`tooltip-${id}`}
          className='mb-5 h-5 overflow-hidden text-center underline hover:text-orange-200 transition-all'
          onClick={(e) => e.stopPropagation()}
        >{title}</h3>
        <div className='flex justify-between items-center'>
          <span>${price}</span>
          <Button
            style='cart-btn'
            click={() => func(data)}
          ><Image src={cartIcon} alt='cart' /></Button>
        </div>
      </div>

      <Tooltip
        id={`tooltip-${id}`}
        place='top'
        content={description}
        className='tooltip'
        style={{ width: '300px', padding: '10px' }}
        openOnClick={true}
        closeEvents={{ mouseleave: true, click: true }}
      />
    </>
  )
})
