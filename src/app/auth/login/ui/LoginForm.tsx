"use client";

import { authenticate } from '@/actions';
import clsx from 'clsx';
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';

export const LoginForm = () => {


    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {

        if (state === 'Success') {
            //redirect
            // router.replace('/')
            window.location.replace('/')
        }
    
    }, [state])



    return (

        <form action={dispatch} className="space-y-3">

            <>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                />
            </>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                />
            </div>

            <div
                className="flex "
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "CredentialsSignin" && (
                    <div className='flex flex-row mb- mt-1'>
                        <p className="text-sm text-red-500">Sorry, something went wrong. Please double-check your credentials.</p>
                    </div>
                )}
            </div>

            <LoginButton />


            <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <a href="/auth/new-account" className="font-medium text-sky-600 hover:underline">
                    Sign up
                </a>
            </p>
        </form>
    )
}

function LoginButton() {

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full": !pending,
                "cursor-not-allowed opacity-50": pending
            })}
            disabled={pending}
        >
            Sign in
        </button>
    );
}

