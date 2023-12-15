'use client'

import { ReactNode, useEffect, useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from './Button'

import cart from '@/../public/cart.svg'
import burger from '@/../public/burger.svg'
import up from '@/../public/up.svg'
import logo from '@/../public/logo.png'

import useCartContext from '@/contexts/CartContext'
import useProductContext from '@/contexts/ProductContext'

export default function Layout({ children }: { children: ReactNode }) {
  const [isShowBtn, setShowBtn] = useState(false)
  const [isShowSidebar, setShowSidebar] = useState(false)

  const { products } = useCartContext()
  const { setProduct } = useProductContext()
  const pathname = usePathname()

  const mainRef = useRef<HTMLDivElement>(null)
  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)

    timeoutRef.current = setTimeout(() => setProduct({ filter: e.target.value.toLowerCase() }), 500)
  }

  const navData = [{ id: 1, title: 'Home', path: '/' }, { id: 2, title: 'Products', path: '/products' }]

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

  return (
    <>
      <div className={`wrap h-screen ${isShowSidebar ? 'overflow-hidden' : 'overflow-auto'} scroll-smooth`} ref={mainRef}>
        <header className='py-3 px-5 md:px-8 bg-green-200 text-lg sticky top-0 w-full h-[68px] z-20'>
          <div className='max-w-7xl mx-auto grid grid-cols-[25px_1fr_40px] items-center gap-5 md:grid-cols-[47px_215px_1fr_40px]'>
            <Link className='hidden md:block' href={'/'}><Image src={logo} alt='logo' /></Link>
            <nav className='hidden md:flex justify-between'>
              <menu>{getMenu()}</menu>
            </nav>
            <button className='md:hidden' onClick={() => setShowSidebar(!isShowSidebar)}>
              <Image src={burger} alt='cart' />
            </button>
            <div className='md:w-4/5 mx-auto relative'>
              <input
                className='w-full pl-3 pr-8 py-2 rounded-md' ref={inputRef}
                type="text" placeholder='Search by name...' onChange={handleChange}
              />
              <span className='absolute top-2 right-3 cursor-pointer'
                onClick={() => {
                  setProduct({ filter: '' })

                  inputRef.current!.value = ''
                }}
              >x</span>
            </div>
            <div className='flex relative'>
              <Link className='contents' href='/cart'>
                <Image src={cart} alt='cart' />
                <span
                  className='
                    absolute right-0  bottom-3 w-[23px] h-[23px] leading-6 text-center text-xs
                    text-slate-50 bg-orange-400 rounded-full
                  '
                >{products.length}</span>
              </Link>
            </div>
          </div>
        </header>

        <main className='relative z-10' onClick={() => isShowSidebar && setShowSidebar(!isShowSidebar)}>
          <div className='min-h-[calc(100vh-132px)] px-5 md:px-8 py-5 md:py-8 bg-slate-50'>
            <aside
              className={`
                fixed mt-[68px] w-[150px] h-screen top-0 flex flex-col ${isShowSidebar ? 'left-0' : 'left-[-150px]'}
                bg-fuchsia-200 md:hidden transition-all
              `}>
              <Image className='py-5 mx-auto' width={80} height={75} src={logo} alt='logo' />
              {
                navData.map(item => (
                  <Link key={item.id}
                    className={`
                      pl-5 py-1 rounded-r-2xl font-semibold ${pathname === item.path ? '!bg-fuchsia-300' : ''} transition-all
                    `}
                    href={item.path}
                  >{item.title}</Link>
                ))
              }
            </aside>
            <div className='max-w-7xl mx-auto'>{children}</div>
          </div>
          <footer className='h-70px py-5 px-8 bg-sky-200'><div className='max-w-7xl mx-auto'>Footer</div></footer>
        </main>
      </div>

      {
        isShowBtn &&
        <Button
          style='absolute bottom-36 right-10 p-3 rounded-xl bg-orange-300/[0.5] z-10'
          click={() => mainRef.current!.scrollTop = 0}
        >
          <Image src={up} alt='up' />
        </Button>
      }
    </>
  )
}
