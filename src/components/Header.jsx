import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import Link from 'next/link';

export default function Header() {
  return (
    <div className='h-[60px] shadow-md bg-white'>
      <div className='flex flex-row items-center justify-between py-2 h-full mx-auto container px-4'>
        <div className='pl-0'>
          <Link href='/'>
            <img src='/Dev.png' className='h-[50px]' />
          </Link>

        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-3'>
          <input type='text' placeholder='search items' className=' outline-none w-full ' />
          <div className='min-w-[50px] h-8 bg-color4 text-lg flex items-center justify-center rounded-r-full'>
            <CiSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='text-3xl cursor-pointer'>
            <FaRegCircleUser />
          </div>

          <div className='text-2xl relative '>
            <span> <FaCartPlus /> </span>
            <div className='bg-color1 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white -top-3 -right-2 absolute'>
              <p>0</p>
            </div>
          </div>

          <div>
            <Link href='login'>
              <button className='bg-color4 text-text-col rounded-xl px-3 py-1'>Login</button>
            </Link>
          </div>

        </div>
      </div>
    </div>

  )
}
