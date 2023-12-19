'use client'

import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'

import useCartContext from '@/contexts/CartContext'
import { ProductType } from '@/types/ProductTypes'

type OrderType = { product: ProductType, amount: number }

export default function Cart() {
  const [order, setOrder] = useState<OrderType[] | []>([])
  const [list, setList] = useState<ProductType[]>([])
  const [isShowLoader, setShowLoader] = useState(false)

  const { products, filter, setOrder: setContext } = useCartContext()
  const { back, push } = useRouter()

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
      products.forEach((item, index) => {
        if (products.findIndex(i => i.id === product.id) === products.findLastIndex(i => i.id === product.id)) return false
        else if (item.id === product.id) return productsCopy = [...products.slice(0, index), ...products.slice(index + 1)]
      })
    }

    setContext({ products: productsCopy })
  }

  const getTotalSum = (): number => {
    let sum = 0

    products.forEach(item => sum += item.price)

    return +sum.toFixed(2)
  }

  const mathBtnStyle = 'w-[20px] h-[20px] align-text-bottom text-center bg-pink-300 text-lg rounded-md leading-[1]'
  const tableHeaderStyle = 'pr-10 pb-10 text-center font-medium text-amber-600'
  const tableCellStyle = 'pr-10 py-5 text-center bg-yellow-100'

  const getCountBtn = (product: ProductType, action: 'plus' | 'minus'): ReactElement => (
    <Button style={mathBtnStyle} click={() => changeAmount(product, action)}>{action === 'minus' ? '-' : '+'}</Button>
  )

  const getDeleteBtn = (product: ProductType): ReactElement => (
    <Button
      style='px-3 py-2 rounded-lg bg-red-300 text-slate-50 hover:bg-red-400 transition-all'
      click={() => setContext({ products: products.filter(item => item.id !== product.id) })}
    >Delete
    </Button>
  )

  return (
    <>
      {
        isShowLoader ? <Spinner /> :
          <>
            <Button style='' click={() => back()}>Go Back</Button>
            {!!order.length && !filter && <div className='mt-5 mb-10 text-center'>
              <Button
                style='p-10 py-3 rounded-md bg-red-500 text-slate-50 hover:bg-red-600 transition-all'
                click={() => setContext({ products: [] })}
              >Delete Order</Button>
            </div>}
            {
              !order.length && !filter ? <h4 className='mt-10 text-center'>No products yet, start your shopping ;)</h4> :
                !order.length && filter ? <h4 className='mt-10 text-center'>No products were found by filter...</h4> :
                  <>
                    <table className='mt-10 hidden lg:table border-separate border-spacing-y-2'>{/* desktop view */}
                      <thead>
                        <tr>
                          <td className={tableHeaderStyle}>Product</td>
                          <td className={tableHeaderStyle}>Price</td>
                          <td className={tableHeaderStyle}>Amount</td>
                          <td className={tableHeaderStyle}>Sum</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          order.map(({ product, amount }) => (
                            <tr key={product.id}>
                              <td className='flex px-10 py-5 bg-yellow-100 cursor-pointer'
                                onClick={() => push(`/products/${product.id}`)}
                              >
                                <Image width={100} height={100} src={product.image} alt={product.image} className='h-32 w-32' />
                                <h3 className='ml-10 my-auto font-semibold'>{product.title}</h3>
                              </td>
                              <td className={tableCellStyle}>${product.price}</td>
                              <td className={`${tableCellStyle} min-w-[125px]`}>
                                {getCountBtn(product, 'minus')}
                                <span className='mx-3'>{amount}</span>
                                {getCountBtn(product, 'plus')}
                              </td>
                              <td className={tableCellStyle}>${(amount * product.price).toFixed(2)}</td>
                              <td className={tableCellStyle}>{getDeleteBtn(product)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>

                    <div className="flex flex-col mt-10 lg:hidden">{/* mobile view */}
                      {
                        order.map(({ product, amount }, index) => (
                          <div key={index + Date.now()} className="mb-10 flex flex-col items-center">
                            <Image width={100} height={100} src={product.image} alt={product.image} className='h-32 w-32 mb-5' />
                            <h3 className='text-center font-semibold'>{product.title}</h3>
                            <div className="flex mt-5 mb-1">
                              <span className='w-[65px] text-right mr-5'>Amount:</span>
                              <div className='w-[75px]'>
                                {getCountBtn(product, 'minus')}
                                <span className='mx-3'>{amount}</span>
                                {getCountBtn(product, 'plus')}
                              </div>
                            </div>
                            <div className="flex mb-1">
                              <span className='w-[65px] text-right mr-5'>Price:</span>
                              <span className='w-[75px]'>${product.price}</span>
                            </div>
                            <div className="flex mb-3">
                              <span className='w-[65px] text-right mr-5'>Sum:</span>
                              <span className='w-[75px]'>${(amount * product.price).toFixed(2)}</span>
                            </div>
                            {getDeleteBtn(product)}
                          </div>
                        ))
                      }
                    </div>
                  </>
            }

            {
              !!order.length && !filter &&
              <>
                <h3 className='my-8 pt-8 font-semibold border-t-4 text-xl text-gray-600'>Total sum: ${getTotalSum()}</h3>
                <div className='text-center'>
                  <Button
                    style='p-10 py-3 rounded-md bg-green-500 text-slate-50 hover:bg-green-600 transition-all'
                    click={() => { }}
                  >Go To Payment and Delivery</Button>
                </div>
              </>
            }
          </>
      }
    </>
  )
}
