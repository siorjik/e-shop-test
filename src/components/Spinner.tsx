'use client'

import { Bars } from 'react-loader-spinner'

export default function Spinner({ style = '', }: { style?: string }) {
  return (
    <div className={`flex justify-center items-center fixed w-full h-screen bg-violet-200 top-0 left-0 z-10 ${style}`}>
      <Bars color='#8b5cf6' ariaLabel='bars-loading' />
    </div>
  )
}