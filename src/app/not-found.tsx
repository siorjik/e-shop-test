import Link from 'next/link'

export default function NotFound () {
  return (
    <div className='px-60 w-full h-screen flex justify-center items-center text-xl text-red-300'>
      <h2>
        Something went wrong, reason: page/resource not found or server error happened,
        go to <Link className='text-red-600' href='/'>Home</Link> page either reload this page or
        try again later...
      </h2>
    </div>
  )
}