'use client'

import { Bars } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='flex justify-center items-center absolute w-full h-full bg-fuchsia-200/[0.5] top-0 left-0'>
      <Bars color='#d946ef' ariaLabel='bars-loading' />
    </div>
  )
}