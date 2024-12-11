'use server'

import { auth, signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2)

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'


  } catch (error) {

    if (error instanceof AuthError) {

      switch (error.type) {
        case 'CredentialsSignin':
          return 'CredentialsSignin';
        default:
          return 'Something went wrong.';
      }

    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {

  try {

    await signIn('credentials', { email, password })

    return {
      ok: true
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Cannot sign in'
    }
  }

}
