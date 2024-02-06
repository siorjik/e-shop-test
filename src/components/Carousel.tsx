'use client'

import { Fragment } from 'react'
import Slider from "react-slick"
import Image from 'next/image'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import chevronLeft from '@/../public/chevron-left.svg'
import chevronRight from '@/../public/chevron-right.svg'

import { ProductType } from '@/types/ProductTypes'
import Link from 'next/link'

export default function Carousel({ data, style }: { data: ProductType[], style: string }) {
  const getItem = (item: ProductType) => (
    <Link href={`/products/${item.id}`}>
      <div className='
        p-3 flex flex-col items-center md:grid md:grid-cols-[14rem,_1fr]
        md:items-start gap-5 md:bg-gradient-to-r from-white cursor-pointer
      '>
        <Image width={100} height={100} src={item.image} alt={item.image} className='h-60 w-56' />
        <div>
          <h2 className='md:mb-5 text-lg font-semibold text-center'>{item.title}</h2>
          <div className='hidden md:line-clamp-6'>{item.description}</div>
        </div>
      </div>
    </Link>
  )

  const Arrow = (
    { currentSlide, slideCount, name, ...restProps }:
      { currentSlide?: string, slideCount?: string, name: string }
  ) => {
    if (name === 'right') return <Image src={chevronRight} {...restProps} alt='next' />
    else return <Image src={chevronLeft} {...restProps} alt='previous' />
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: `${style}`,
    nextArrow: <Arrow name='right' />,
    prevArrow: <Arrow name='left' />,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  }

  return (
    <>
      <Slider {...settings}>{data.map(item => <Fragment key={item.id}>{getItem(item)}</Fragment>)}</Slider>
    </>
  )
}
