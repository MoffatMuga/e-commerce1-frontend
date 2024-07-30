"use client"
import React from 'react'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';

export default function login() {

    const [showPassword, setShowPassword] = useState(false)


    return (
        <section id='login'>
            <div className='container px-4 mx-auto mt-4 '>
                <div className='max-w-md bg-white mx-auto p-2 w-full py-5 shadow-lg rounded-xl'>
                    <div className='flex justify-center '>
                        <img src='/Dev.png' className='h-[80px]' />

                    </div>
                    <span className='flex justify-center text-2xl font-bold mt-8'>Welcome Back!</span>
                    <div className='grid gap-4 mt-10'>
                        <form action="">

                            <label htmlFor="">Email:</label>
                            <div className="h-10">
                                <input type='email' placeholder='enter valid email' className=" w-full outline-none h-full border border-color4 rounded-md px-2" />
                            </div>

                            <label htmlFor="">Password:</label>
                            <div className="h-10 flex border border-color4 rounded-md items-center px-2">
                                <input type={showPassword ? "text" : "password"} placeholder='enter valid email' className=" w-full outline-none h-full " />

                                <div className='cursor-pointer' onClick={() => setShowPassword((preve) => (!preve))}>
                                    <span >
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }

                                    </span>
                                </div>
                            </div>
                        </form>
                        <p><Link href='forgotPassword' className='text-text-col text-sm hover:text-color1 cursor-pointer underline'>Forgot Password?</Link></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button className='bg-color1 px-2 py-1 w-full rounded-md max-w-[170px] hover:scale-105 transition-all'>Login</button>
                    </div>
                    <div className='flex flex-row'>
                        <p>Dont have an account yet?</p>
                        <p><Link href='register' className='text-text-col hover:text-color1 cursor-pointer underline'>Register here</Link></p>
                    </div>
                </div>


            </div>
        </section>
    )
}
