"use client";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                email, firstName, lastName, mobile, password
            });
            console.log('Register response:', response.data);
            toast.success('Register Successful');
            router.push('login');
        } catch (error) {
            toast.error('Error Registering User');
        }
    };

    return (
        <section id="register">
            <ToastContainer />
            <div className="container px-4 mx-auto mt-4 mb-4">
                <div className="max-w-md w-full bg-white mx-auto py-5 px-3 shadow-xl rounded-xl">
                    <div className="flex justify-center">
                        <img src="/Dev.png" className="h-[80px]" alt="Logo" />
                    </div>
                    <span className="flex justify-center text-2xl font-bold mt-8">Welcome Back!</span>
                    <div>
                        <form onSubmit={handleRegister} className="flex flex-col gap-1 mt-2">
                            <label htmlFor="firstName">First Name</label>
                            <div>
                                <input
                                    type="text"
                                    className="outline-none w-full border border-color4 rounded-md"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor="lastName">Last Name</label>
                            <div>
                                <input
                                    type="text"
                                    className="outline-none w-full border border-color4 rounded-md"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor="email">Email</label>
                            <div>
                                <input
                                    type="email"
                                    className="outline-none w-full border border-color4 rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor="mobile">Mobile</label>
                            <div>
                                <input
                                    type="text"
                                    className="outline-none w-full border border-color4 rounded-md"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor="password">Password</label>
                            <div className="flex border border-color4 rounded-md px-2 items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="outline-none w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="flex border border-color4 rounded-md items-center px-2">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="outline-none w-full"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <div className="cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-color1 px-2 py-1 w-full rounded-md max-w-[170px] hover:scale-105 transition-all">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-row mt-2">
                        <p>Already have an account?</p>
                        <p>
                            <Link href="/login" className="text-text-col hover:text-color1 cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
