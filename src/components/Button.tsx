'use client'

import { ReactNode } from 'react'

export default function Button({ children, style, click }: { children: ReactNode, style: string, click: () => void }) {
  return (
    <button
      className={`${style}`}
      onClick={(e) => {
        e.stopPropagation()

        click()
      }}
    >{children}</button>
  )
}
