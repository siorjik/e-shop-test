'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '../Button'

import up from '@/../public/up.svg'
import logo from '@/../public/logo.png'
import Header from './Header'
import navData from './navData'

export default function Layout({ children }: { children: ReactNode }) {
  const [isShowBtn, setShowBtn] = useState(false)
  const [isShowSidebar, setShowSidebar] = useState(false)

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

  return (
    <>
      <div className={`wrap h-screen ${isShowSidebar ? 'overflow-hidden' : 'overflow-auto'} scroll-smooth`} ref={mainRef}>
        <header className='py-3 px-5 md:px-8 bg-green-200 text-lg sticky top-0 w-full h-[68px] z-20'>
          <Header setShowSidebar={() => setShowSidebar(!isShowSidebar)} />
        </header>

        <main className='relative z-10' onClick={() => isShowSidebar && setShowSidebar(!isShowSidebar)}>
          <div className='min-h-[calc(100vh-132px)] px-5 md:px-8 py-5 md:py-8 bg-slate-50'>
            <aside
              className={`
                mt-[68px] w-[150px] h-screen bg-fuchsia-200 md:hidden transition-all
                fixed top-0 flex flex-col ${isShowSidebar ? 'left-0' : 'left-[-150px]'}
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
