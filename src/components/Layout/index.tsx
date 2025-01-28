'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '../Button'
import Header from './Header'
import ThemeBtn from '../ThemeBtn'

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
        <header 
          className='py-2 px-5 flex md:px-8 md:block bg-green-200 dark:bg-green-700 text-lg fixed top-0 w-full h-[60px] z-20'
        >
          <Header setShowSidebar={() => setShowSidebar(!isShowSidebar)} />
        </header>

        <main className='relative z-10 mt-[60px]' onClick={() => isShowSidebar && setShowSidebar(!isShowSidebar)}>
          <div className='min-h-[calc(100dvh-120px)] px-5 md:px-8 py-5 md:py-8 bg-slate-50 dark:bg-slate-800'>
            <aside
              className={`
                mt-[60px] w-[200px] h-screen bg-stone-200 dark:bg-stone-500 md:hidden transition-all z-10
                fixed top-0 flex flex-col ${isShowSidebar ? 'left-0' : 'left-[-200px]'}
              `}>
              <Image className='py-8 mx-auto' width={70} height={70} src={logo} alt='logo' />
              {
                navData.map(item => (
                  <Link key={item.id}
                    className={`
                      pl-5 py-3 mr-1 rounded-r-3xl border-l-8 border-transparent font-semibold
                      ${pathname === item.path ? '!bg-stone-300 dark:!bg-stone-600 !border-stone-400 dark:!border-stone-700' : ''}
                      transition-all
                    `}
                    href={item.path}
                  >{item.title}</Link>
                ))
              }
            </aside>
            <div className='max-w-7xl mx-auto relative'>{children}</div>
          </div>
          <footer className='h-[60px] py-2 px-5 md:px-8 flex items-center bg-sky-200 dark:bg-sky-700'>
            <div className='w-full m-auto max-w-7xl flex justify-between items-center text-sm'>
              &copy; {new Date().getFullYear()}
              <ThemeBtn />
            </div>
          </footer>
        </main>
      </div>

      {
        isShowBtn &&
        <Button
          style='absolute bottom-36 right-10 2xl:right-[30%] p-3 rounded-xl bg-orange-300/[0.5] dark:bg-orange-500/[0.7] z-10'
          click={() => mainRef.current!.scrollTop = 0}
        >
          <Image src={up} alt='up' />
        </Button>
      }
    </>
  )
}
