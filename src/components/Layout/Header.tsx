'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import cart from '@/../public/cart.svg'
import burger from '@/../public/burger.svg'
import logo from '@/../public/logo.png'

import useCartContext from '@/contexts/CartContext'
import navData from './navData'
import useGlobalSearch from '@/hooks/useGlobalSearch'

export default function Header({ setShowSidebar }: { setShowSidebar: () => void }) {
  const [search, setSearch] = useState('')

  useGlobalSearch(search)

  const pathname = usePathname()
  const { products } = useCartContext()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const getMenu = () => {
    return navData.map(item => (
      <Link key={item.id}
        className={`
          pb-5 px-3 ml-3 border-b-2 border-transparent font-semibold
          ${pathname === item.path ? '!border-green-600' : 'hover:border-green-400'} transition-all
        `}
        href={item.path}
      >{item.title}</Link>
    ))
  }

  const getSearch = () => (
    <div className='md:w-[85%] mx-auto relative'>
      <input
        className='w-full pl-3 pr-8 py-2 rounded-md' value={search}
        type="text" placeholder='Search by name...' onChange={handleChange}
      />
      <span className='absolute top-2 right-3 cursor-pointer'
        onClick={() => setSearch('')}
      >x</span>
    </div>
  )

  const getCart = () => (
    <div className='flex relative'>
      <Link className='contents' href='/cart'>
        <Image src={cart} alt='cart' />
        <span
          className='
            absolute right-0  bottom-3 w-[23px] h-[23px] leading-6 text-center text-xs text-slate-50 bg-orange-400 rounded-full
          '
        >{products.length}</span>
      </Link>
    </div>
  )

  return (
    <>
      <div className='hidden md:max-w-7xl mx-auto md:grid items-center gap-5 grid-cols-[67px_215px_1fr_40px]'>
        <Link className='hidden md:block pr-5' href={'/'}><Image src={logo} alt='logo' /></Link>
        <nav className='hidden md:flex justify-between'>
          <menu>{getMenu()}</menu>
        </nav>
        {getSearch()}
        {getCart()}
      </div>

      <div className='mx-auto grid grid-cols-[25px_1fr_40px] items-center gap-5 md:hidden'>
        <button onClick={() => setShowSidebar()}>
          <Image src={burger} alt='menu' />
        </button>
        {getSearch()}
        {getCart()}
      </div>
    </>
  )
}
