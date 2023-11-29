'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from './Button'

import cartIcon from '@/../public/cartIcon.svg'
import useCartContext from '@/contexts/CartContext'
import upIcon from '@/../public/upIcon.svg'

export default function Layout({ children }: { children: ReactNode }) {
  const [isShowBtn, setShowBtn] = useState(false)

  const { products } = useCartContext()
  const pathname = usePathname()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = mainRef.current!

    div.addEventListener('scroll', () => {
      setShowBtn(div.scrollTop > 1500 && div.scrollHeight > 1000)
    })

    return () => {
      div.removeEventListener('scroll', () => {
        setShowBtn(div.scrollTop > 1500 && div.scrollHeight > 1000)
      })
    }
  }, [])

  const navData = [{ id: 1, title: 'Home', path: '/' }, { id: 2, title: 'Products', path: '/products' }]
  const getMenu = () => {
    return navData.map(item => (
      <Link key={item.id}
        className={`
        pb-5 px-3 mr-3 border-b-2 border-transparent font-semibold
        ${pathname === item.path ? 'border-green-600' : 'hover:border-green-400'} transition-all
      `}
        href={item.path}
      >{item.title}</Link>
    ))
  }

  return (
    <>
      <div className={`wrap grid md:grid-cols-1 h-screen overflow-auto scroll-smooth`} ref={mainRef}>
        <header className='py-5 px-8 bg-green-200 text-lg fixed w-full'>
          <div className='max-w-7xl mx-auto grid grid-cols-[100px_1fr]'>
            <Link className='hidden md:block' href={'/'}>Logo</Link>
            <nav className='flex justify-between'>
              <menu>{getMenu()}</menu>
              <div className='mr-3 flex absolute right-[30px] top-[22px] cursor-pointer md:relative md:right-0 md:top-0'>
                <Link className='contents' href='/cart'>
                  <Image src={cartIcon} alt='cart' />
                  <span
                    className='
                    absolute right-[-15px] bottom-3 w-[23px] h-[23px] leading-6 text-center text-xs
                    text-slate-50 bg-orange-400 rounded-full
                  '
                  >{products.length}</span>
                </Link>
              </div>
            </nav>
          </div>
        </header>
        
        <main className='mt-16'>
          <div className='min-h-[calc(100vh-128px)] px-8 py-10 bg-slate-50'>
            <div className='max-w-7xl mx-auto'>{children}</div>
          </div>
          <footer className='h-70px py-5 px-8 bg-sky-200'><div className='max-w-7xl mx-auto'>Footer</div></footer>
        </main>
      </div>
      {
        isShowBtn &&
        <Button
          style='absolute bottom-36 right-10 p-3 rounded-xl bg-orange-300/[0.5]'
          click={() => mainRef.current!.scrollTop = 0}
        >
          <Image src={upIcon} alt='up' />
        </Button>
      }
    </>
  )
}
