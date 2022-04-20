import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartState } from '../context/cart'

export default function Navbar() {
  const { total_items } = useCartState()
  const [navColor, setNavColor] = useState(0)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      setNavColor(window.scrollY)
    })
  }, [navColor])
  const showMenu = () => {
    if (menu) {
      setMenu(false)
    } else {
      setMenu(true)
    }
  }
  return (
    <div
      className={` mx-auto flex h-20 max-w-7xl items-center justify-center backdrop-blur-sm ${
        navColor >= 60
          ? 'fixed top-0 left-1/2 z-50 mx-auto -mb-20 flex h-20 w-screen max-w-7xl -translate-x-1/2 items-center justify-center border-b-2 border-gray-300 bg-white transition-colors delay-100 ease-in-out'
          : 'bg - transparent'
      } `}
    >
      <button className="absolute left-0 ml-10 md:hidden" onClick={showMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {menu && (
        <div className="fixed top-20 left-0 h-56 w-1/2 rounded-sm bg-slate-100 pl-5 shadow-sm md:hidden">
          <ul className="space-y-4 ">
            <Link href="/women">
              <li className="underline-offset-4 hover:cursor-pointer hover:underline  ">
                WOMEN
              </li>
            </Link>
            <Link href="/men">
              <li className="underline-offset-4 hover:cursor-pointer  hover:underline ">
                MEN
              </li>
            </Link>
            <Link href="/">
              <li className="font-stick text-3xl tracking-widest  hover:cursor-pointer hover:text-slate-500 ">
                GALLERIA
              </li>
            </Link>
            <Link href="/accessories">
              <li className="underline-offset-4 hover:cursor-pointer  hover:underline ">
                ACCESSORIES
              </li>
            </Link>
            <Link href="/sale">
              <li className="underline-offset-4 hover:cursor-pointer  hover:underline">
                SALE
              </li>
            </Link>
          </ul>
        </div>
      )}

      <ul
        className={`flex space-x-12 font-cinzel font-semibold tracking-widest text-slate-800 z-20${
          navColor >= 60 &&
          'text-gray-500 transition-colors delay-100 ease-in-out'
        }`}
      >
        <Link href="/women">
          <li className="hidden underline-offset-4 hover:cursor-pointer hover:underline md:inline-flex ">
            WOMEN
          </li>
        </Link>
        <Link href="/men">
          <li className="hidden underline-offset-4 hover:cursor-pointer  hover:underline md:inline-flex">
            MEN
          </li>
        </Link>
        <Link href="/">
          <li className="hidden font-stick text-3xl tracking-widest  hover:cursor-pointer hover:text-slate-500 md:inline-flex ">
            GALLERIA
          </li>
        </Link>
        <Link href="/accessories">
          <li className="hidden underline-offset-4 hover:cursor-pointer  hover:underline md:inline-flex">
            ACCESSORIES
          </li>
        </Link>
        <Link href="/sale">
          <li className="hidden underline-offset-4 hover:cursor-pointer  hover:underline md:inline-flex">
            SALE
          </li>
        </Link>
        <Link href="/cart">
          <div className="relative ml-14 inline-block h-8 w-8 hover:cursor-pointer">
            {total_items > 0 && (
              <div className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 bg-opacity-70 text-sm text-white">
                {total_items}
              </div>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </Link>
      </ul>
    </div>
  )
}
