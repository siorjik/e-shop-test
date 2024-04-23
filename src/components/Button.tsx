'use client'

import { ReactNode, MouseEvent } from 'react'

export default function Button({ children, style, click = () => {}, type = 'button' }:
  { children: ReactNode, style: string, click?: () => void, type?: 'button' | 'submit' }
) {
  return (
    <button
      type={type}
      className={`${style}`}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        click()
      }}
    >{children}</button>
  )
}
