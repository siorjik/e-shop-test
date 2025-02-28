'use client'

import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'

import plus from '@/../public/plus.svg'
import minus from '@/../public/minus.svg'
import trash from '@/../public/trash.svg'

import DesktopView from './components/DesktopView'
import MobileView from './components/MobileView'

import { useCartContext, useCartActionsContext } from '@/contexts/CartContext'
import { ProductType } from '@/types/ProductTypes'
import useScreenData from '@/hooks/useScreenData'
import { OrderType } from '@/types/CartTypes'
import Link from 'next/link'

export default function Cart() {
  const [order, setOrder] = useState<OrderType[] | []>([])
  const [list, setList] = useState<ProductType[]>([])
  const [isShowLoader, setShowLoader] = useState(false)

  const { isMobile } = useScreenData()

  const { products, filter, sum } = useCartContext()
  const { setOrder: setContext } = useCartActionsContext()

  useEffect(() => {
    if (products.length) {
      if (filter) {
        setList(products.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())))
      } else setList(products)
    } else setList([])
  }, [filter, products])

  useEffect(() => {
    if (list.length) setMappedOrder()
    else setOrder([])

    setShowLoader(true)
  }, [list])

  useEffect(() => {
    if (isShowLoader) setTimeout(() => setShowLoader(!isShowLoader), 300)
  }, [isShowLoader])

  const setMappedOrder = (): void => {
    let newOrder: OrderType[] = []

    list.forEach((item) => {
      if (newOrder.find(orderItem => item.id === orderItem.product.id)) {
        const index = newOrder.findIndex(orderItem => item.id === orderItem.product.id)

        newOrder = [
          ...newOrder.slice(0, index),
          { ...newOrder[index], amount: newOrder[index].amount + 1 },
          ...newOrder.slice(index + 1)
        ]
      } else newOrder = [...newOrder, { product: { ...item }, amount: 1 }]
    })

    setOrder(newOrder)
  }

  const changeAmount = (product: ProductType, action: 'minus' | 'plus'): void => {
    let productsCopy = [...products]

    if (action === 'plus') {
      productsCopy = [...productsCopy, product]
    } else {
      if (products.findIndex(i => i.id === product.id) === products.findLastIndex(i => i.id === product.id)) return

      products.forEach((item, index) => {
        if (item.id === product.id) return productsCopy = [...products.slice(0, index), ...products.slice(index + 1)]
      })
    }

    setContext({ products: productsCopy })
  }

  const getCountBtn = (product: ProductType, action: 'plus' | 'minus'): ReactElement => (
    <Button style={'p-1 bg-pink-300 dark:bg-pink-500 rounded-full'} click={() => changeAmount(product, action)}>
      <Image src={action === 'minus' ? minus : plus} alt='counter-btn' height={10} width={10} />
    </Button>
  )

  const getDeleteBtn = (product: ProductType): ReactElement => (
    <Button
      style='px-3 py-2 rounded-lg bg-red-300 dark:bg-red-500 text-slate-50 hover:bg-red-400 dark:hover:bg-red-600 transition-all'
      click={() => setContext({ products: products.filter(item => item.id !== product.id) })}
    ><Image className='w-5 h-5 md:w-12' src={trash} alt='trash' /></Button>
  )

  return (
    <>
      <>
        {!!order.length && !filter && <div className='text-center'>
          <Button
            style='
              p-10 py-3 rounded-md bg-red-500 dark:bg-red-700 text-slate-50 hover:bg-red-600 dark:hover:bg-red-800 transition-all
            '
            click={() => setContext({ products: [] })}
          >Delete Order</Button>
        </div>}
        {
          !order.length && !filter ? <h4 className='text-center'>No products yet, start your shopping ;)</h4> :
            !order.length && filter ? <h4 className='text-center'>No products were found by filter...</h4> :
              <div className='lg:grid lg:grid-cols-[3fr,1fr] gap-3'>
                {
                  !isMobile ? <DesktopView order={order} getCountBtn={getCountBtn} getDeleteBtn={getDeleteBtn} /> :
                    <MobileView order={order} getCountBtn={getCountBtn} getDeleteBtn={getDeleteBtn} />
                }

                {
                  !!order.length && !filter &&
                  <div className='lg:text-center'>
                    <div className='lg:sticky lg:top-[60px] lg:mt-10'>
                      <h3
                        className='
                          my-8 lg:my-2 pt-8 lg:pt-0 font-semibold border-t-4 lg:border-t-0
                          text-xl text-gray-600 dark:text-gray-400
                        '
                      >
                        Total sum: ${sum}
                      </h3>
                      <div className='flex justify-center'>
                        <Link className='green-btn table-cell' href='/checkout'>Go To Payment and Delivery</Link>
                      </div>
                    </div>
                  </div>
                }
              </div>
        }
      </>
      {isShowLoader && <Spinner style='client-spinner' />}
    </>
  )
}
