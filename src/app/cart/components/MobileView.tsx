import Image from 'next/image'
import Link from 'next/link'

import { ViewPropsType } from '@/types/CartTypes'

export default function MobileView({ order, getCountBtn, getDeleteBtn }: ViewPropsType) {
  return (
    <div className="flex flex-col mt-10">
      {
        order.map(({ product, amount }, index) => (
          <div key={index + Date.now()} className="mb-3 p-5 flex flex-col items-center rounded-lg bg-cyan-100 dark:bg-cyan-700">
            <Link className='flex flex-col items-center' href={`/products/${product.id}`}>
              <Image width={100} height={100} src={product.image} alt={product.image} className='h-32 w-32 mb-5' />
              <h3 className='text-center font-semibold'>{product.title}</h3>
            </Link>
            <div className="flex mt-5 mb-1">
              <span className='w-[65px] text-right mr-5'>Amount:</span>
              <div className='w-[85px]'>
                {getCountBtn(product, 'minus')}
                <span className='mx-3'>{amount}</span>
                {getCountBtn(product, 'plus')}
              </div>
            </div>
            <div className="flex mb-1">
              <span className='w-[65px] text-right mr-5'>Price:</span>
              <span className='w-[85px]'>${product.price}</span>
            </div>
            <div className="flex mb-3">
              <span className='w-[65px] text-right mr-5'>Sum:</span>
              <span className='w-[85px]'>${(amount * product.price).toFixed(2)}</span>
            </div>
            {getDeleteBtn(product)}
          </div>
        ))
      }
    </div>
  )
}
