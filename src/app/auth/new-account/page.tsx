'use client'

import { RegisterForm } from './ui/RegisterForm';

const NewAccountPage = () => {

  return (
    
    <main className="flex items-center justify-center flex-col px-6 pt-32 sm:pt-32">
      <div className="w-full bg-white rounded-lg border">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-sky-700 md:text-2xl">
            Create a new account
          </h1>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}

export default NewAccountPage;
