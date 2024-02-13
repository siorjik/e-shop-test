'use client'

import { ReactNode, MouseEvent } from 'react'

export default function Button({ children, style, click }: { children: ReactNode, style: string, click: () => void }) {
  return (
    <button
      className={`${style}`}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        click()
      }}
    >{children}</button>
  )
}
