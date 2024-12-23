'use client'

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
    email: string;
    name: string;
    lastName: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        const { name, lastName, email, password } = data

        const resp = await registerUser({name, lastName, email, password, role: 'ADMIN'})

        if (!resp.ok) {
            setErrorMessage(resp.message)
            return
        }    

        await login(email.toLowerCase(), password)
        window.location.replace('/')

    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Your name
                </label>
                <input
                    type="name"
                    id="name"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    } placeholder="John"
                    {...register('name', { required: true })}
                />
            </div>
            <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                    Your last name
                </label>
                <input
                    type="lastName"
                    id="lastName"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    } placeholder="Doe"
                    {...register('lastName', { required: true })}
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('password', { required: true, minLength: 6 })}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
                Sign up
            </button>
            <p className="text-sm font-light text-gray-500">
                Have an account?{' '}
                <a href="/auth/login" className="font-medium text-sky-600 hover:underline">
                    Log in
                </a>
            </p>
        </form>

    )
}
