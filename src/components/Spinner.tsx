'use client'

import { Bars } from 'react-loader-spinner'
import { useTheme } from 'next-themes'

export default function Spinner({ style = '', }: { style?: string }) {
  const { theme } = useTheme()

  const color = theme === 'light' ? '#8b5cf6' : '#a78bfa'

  return (
    <div
      className={`
        flex justify-center items-center fixed w-full h-screen bg-violet-200 dark:bg-purple-950 top-0 left-0 z-10 ${style}
      `}
    >
      <Bars color={color} ariaLabel='bars-loading' />
    </div>
  )
}