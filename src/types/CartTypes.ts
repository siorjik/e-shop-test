import { ReactElement } from 'react'

import { ProductType } from './ProductTypes'

export type OrderType = { product: ProductType, amount: number }

export type ViewPropsType = {
  order: OrderType[] | [],
  getCountBtn: (product: ProductType, action: 'plus' | 'minus') => ReactElement,
  getDeleteBtn: (product: ProductType) => ReactElement
}
