'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '../Button'
import Header from './Header'

import up from '@/../public/up.svg'
import logo from '@/../public/logo.png'
import navData from './navData'

export default function Layout({ children }: { children: ReactNode }) {
  const [isShowBtn, setShowBtn] = useState(false)
  const [isShowSidebar, setShowSidebar] = useState(false)
  
  const pathname = usePathname()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = mainRef.current!

    div.addEventListener('scroll', () => setShowBtn(div.scrollTop > 1500 && div.scrollHeight > 1000))

    return () => {
      div.removeEventListener('scroll', () => setShowBtn(div.scrollTop > 1500 && div.scrollHeight > 1000))
    }
  }, [])

  return (
    <>
      <div className={`wrap h-[100dvh] ${isShowSidebar ? 'overflow-hidden' : 'overflow-auto'} scroll-smooth`} ref={mainRef}>
        <header className='py-3 px-5 flex md:px-8 md:block bg-green-200 text-lg fixed top-0 w-full h-[68px] z-20'>
          <Header setShowSidebar={() => setShowSidebar(!isShowSidebar)} />
        </header>

        <main className='relative z-10 mt-[68px]' onClick={() => isShowSidebar && setShowSidebar(!isShowSidebar)}>
          <div className='min-h-[calc(100dvh-132px)] px-5 md:px-8 py-5 md:py-8 bg-slate-50'>
            <aside
              className={`
                mt-[68px] w-[200px] h-screen bg-stone-200 md:hidden transition-all z-10
                fixed top-0 flex flex-col ${isShowSidebar ? 'left-0' : 'left-[-200px]'}
              `}>
              <Image className='py-8 mx-auto' width={70} height={70} src={logo} alt='logo' />
              {
                navData.map(item => (
                  <Link key={item.id}
                    className={`
                      pl-5 py-3 mr-1 rounded-r-3xl border-l-8 border-transparent font-semibold
                      ${pathname === item.path ? '!bg-stone-300 !border-stone-400' : ''} transition-all
                    `}
                    href={item.path}
                  >{item.title}</Link>
                ))
              }
            </aside>
            <div className='max-w-7xl mx-auto'>{children}</div>
          </div>
          <footer className='h-70px py-5 px-8 bg-sky-200'><div className='max-w-7xl mx-auto'>&copy; 2024</div></footer>
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
