"use client";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Login successful');
            router.push('profile');
        } catch (error) {
            toast.error('Error Logging In');
        }
    };

    return (
        <section id="login">
            <ToastContainer />
            <div className="container px-4 mx-auto mt-4">
                <div className="max-w-md bg-white mx-auto p-2 w-full py-5 shadow-lg rounded-xl">
                    <div className="flex justify-center">
                        <img src="/Dev.png" className="h-[80px]" alt="Logo" />
                    </div>
                    <span className="flex justify-center text-2xl font-bold mt-8">Welcome Back!</span>
                    <div className="grid gap-4 mt-10">
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email">Email:</label>
                            <div className="h-10">
                                <input
                                    type="email"
                                    placeholder="Enter valid email"
                                    className="w-full outline-none h-full border border-color4 rounded-md px-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor="password">Password:</label>
                            <div className="h-10 flex border border-color4 rounded-md items-center px-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full outline-none h-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button type="submit" className="bg-color1 px-2 py-1 w-full rounded-md max-w-[170px] hover:scale-105 transition-all">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p>
                            <Link href="/forgotPassword" className="text-text-col text-sm hover:text-color1 cursor-pointer underline">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <p>Don't have an account yet?</p>
                        <p>
                            <Link href="/register" className="text-text-col hover:text-color1 cursor-pointer underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
