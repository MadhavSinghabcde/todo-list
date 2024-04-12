'use client'

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton"
import { AuthUserCheck } from "@/types/auth";
import Link from "next/link";
import { loginUser } from "@/app/(auth)/actions";

// CHECK: WTF am I doing here!?
const initialState: AuthUserCheck = {
    user: null,
    error: null
}

const Login = () => {
    // CHECK: Same as above, go deeper into this
    const [state, formAction] = useFormState(loginUser, initialState);

    useEffect(() => {
        if (localStorage.getItem('user')) redirect('/');

        if (state?.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
            redirect('/');
        }
    }, [state])

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-5'>
                <div className='text-center flex flex-col gap-1'>
                    <h1 className='text-3xl font-semibold'>Welcome Back</h1>
                    <h1 className='text-sm text-[#7f8ea3]'>Login to your account</h1>
                </div>
                <form action={formAction} className='flex flex-col justify-center items-center gap-4'>
                    {/* TODO: Add maxLength to the fields */}
                    <div className='flex flex-col gap-4 w-full'>
                        <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            placeholder="Email"
                            required={true}
                            // CHECK: Checking using brute force
                            // MAYBE: had a type on those error for better categorization
                            className={
                                `rounded-md text-sm border
                                ${state?.error?.includes('User') || state?.error?.includes('email')
                                    ? 'border-red-500'
                                    : 'border-[#27272a]'
                                }
                                h-10 py-2 px-3 bg-transparent placeholder:text-[#7f8ea3] placeholder:text-sm focus:outline-none focus:outline-offset-2 focus:outline-[#27272a]`
                            }
                        />
                        <input
                            type="password"
                            autoComplete="password"
                            name="password"
                            placeholder="Password"
                            required={true}
                            className={
                                `rounded-md text-sm border
                                ${state?.error?.includes('password')
                                    ? 'border-red-500'
                                    : 'border-[#27272a]'
                                }
                                h-10 py-2 px-3 bg-transparent placeholder:text-[#7f8ea3] placeholder:text-sm focus:outline-none focus:outline-offset-2 focus:outline-[#27272a]`
                            }
                        />
                    </div>
                    {/* TODO?: Change to '<Button />' component */}
                    <AuthButton type='login' />
                </form>
                <h1 className='text-sm text-[#7f8ea3] text-center'>Don't have an account? <Link className='underline underline-offset-4 decoration-[#e1e7ef]/40 hover:decoration-[#e1e7ef]/80' href='/register'>Register Now</Link></h1>
                <div className='text-red-400 text-sm text-center -mt-2'>{state?.error}</div>
            </div>
        </div>
    )
}

export default Login;
