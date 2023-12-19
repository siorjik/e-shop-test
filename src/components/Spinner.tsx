'use client'

import { Bars } from 'react-loader-spinner'

export default function Spinner({ style = '', }: { style?: string }) {
  return (
    <div className={`flex justify-center items-center fixed w-full h-screen bg-fuchsia-200 top-0 left-0 z-10 ${style}`}>
      <Bars color='#d946ef' ariaLabel='bars-loading' />
    </div>
  )
}