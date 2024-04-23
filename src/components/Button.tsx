'use client'

import { ReactNode, MouseEvent } from 'react'

export default function Button({ children, style, click = () => {}, type = 'button', disabled = false }:
  { children: ReactNode, style: string, click?: () => void, type?: 'button' | 'submit', disabled?: boolean }
) {
  return (
    <button
      type={type}
      className={`${style}`}
      disabled={disabled}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        click()
      }}
    >{children}</button>
  )
}
