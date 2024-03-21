'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import Link from 'next/link'

export default function CategoriesList({ list = [], query = '' }: { list: string[], query: string }) {
  const [categories, setCategories] = useState<{ name: string, isChecked: boolean }[]>([])

  useEffect(() => {
    setCategories(list.map(item => ({ name: item, isChecked: !!query && !!query.split(',').find(q => q === item) })))
  }, [list])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e

    setCategories(categories.map(item => {
      if (item.name === value) return ({ ...item, isChecked: !item.isChecked })
      else return ({ ...item })
    }))
  }

  const getQueryString = () => categories.filter(item => item.isChecked).map(item => item.name).join(',')

  const firstLetterUp = (val: string) => val[0].toUpperCase() + val.slice(1)

  return (
    <>
      {
        categories.length && <div className='flex flex-col'>
          <h3 className='mb-5'>Categories:</h3>
          {
            categories.map((item, index) => (
              <label key={index} className='mb-1 cursor-pointer'>
                <input
                  className='mr-3 cursor-pointer'
                  name={item.name}
                  type='checkbox'
                  onChange={onChange}
                  value={item.name}
                  checked={item.isChecked}
                />{firstLetterUp(item.name)}
              </label>
            ))
          }
          <div className="mt-5 flex md:justify-between">
            {categories.find(item => item.isChecked) &&
              <Link className='py-1 px-3 mr-5 bg-slate-200 rounded-md' href={`/products?categories=${getQueryString()}`}>
                Apply
              </Link>}
            {query && <Link className='py-1 px-3 bg-slate-200 rounded-md' href='/products'>Reset</Link>}
          </div>
        </div>
      }
    </>
  )
}
