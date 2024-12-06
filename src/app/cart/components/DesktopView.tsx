import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { ViewPropsType } from '@/types/CartTypes'

export default function DesktopView({ order, getCountBtn, getDeleteBtn }: ViewPropsType) {
  const { push } = useRouter()

  const tableHeaderStyle = 'pr-5 pb-5 text-center font-medium text-amber-600'
  const tableCellStyle = 'pr-5 py-5 text-center bg-yellow-100'

  return (
    <table className='mt-8 table border-separate border-spacing-y-2'>
      <thead className='sticky top-[68px] bg-slate-50'>
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
              <td className='px-5 py-5 flex flex-col items-center bg-yellow-100 cursor-pointer rounded-s-xl'
                onClick={() => push(`/products/${product.id}`)}
              >
                <Image width={100} height={100} src={product.image} alt={product.image} className='h-32 w-32' />
                <h3 className='mt-5 my-auto font-semibold text-center line-clamp-1'>{product.title}</h3>
              </td>
              <td className={tableCellStyle}>${product.price}</td>
              <td className={`${tableCellStyle} min-w-[125px]`}>
                {getCountBtn(product, 'minus')}
                <span className='mx-3'>{amount}</span>
                {getCountBtn(product, 'plus')}
              </td>
              <td className={tableCellStyle}>${(amount * product.price).toFixed(2)}</td>
              <td className={`${tableCellStyle} rounded-e-xl`}>{getDeleteBtn(product)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
