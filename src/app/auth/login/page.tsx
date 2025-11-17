// app/auth/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';

type LoginFormValues = {
  phoneNumber: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    // TODO: change URL to your backend login endpoint
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4'>
      <div className='w-full max-w-md bg-background border border-border rounded-2xl shadow-xl p-6 sm:p-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          আপনার অ্যাকাউন্টে লগইন করুন
        </h1>
        <p className='text-sm text-muted-foreground mb-6 text-center'>
          লগইন করতে আপনার মোবাইল নাম্বার এবং পাসওয়ার্ড দিন
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>
              মোবাইল নম্বর
            </label>
            <input
              type='tel'
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
              placeholder='+8801XXXXXXXXX'
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
            />
            {errors.phoneNumber && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>পাসওয়ার্ড</label>
            <input
              type='password'
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
              placeholder='••••••••'
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
              })}
            />
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60'
          >
            {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>
      </div>
    </main>
  );
}
