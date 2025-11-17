'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type LoginFormValues = {
  phoneNumber: string;
  password: string;
  remember?: boolean;
};

// Accept 01XXXXXXXXX or +8801XXXXXXXXX and normalize to +8801XXXXXXXXX
function normalizeBDPhone(input: string): string | null {
  const trimmed = input.trim();
  if (/^\+8801[3-9]\d{8}$/.test(trimmed)) return trimmed; // already E.164
  const digits = trimmed.replace(/\D/g, '');
  if (/^01[3-9]\d{8}$/.test(digits)) return `+88${digits}`; // 01... -> +8801...
  if (/^8801[3-9]\d{8}$/.test(digits)) return `+${digits}`; // 8801... -> +8801...
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ mode: 'onBlur' });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    // Normalize and validate phone to E.164
    const normalized = normalizeBDPhone(data.phoneNumber);
    if (!normalized) {
      setError('phoneNumber', {
        type: 'validate',
        message: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX বা +8801XXXXXXXXX)',
      });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: normalized,
          password: data.password,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Try to show meaningful message from backend
        const msg =
          json?.message ||
          json?.error ||
          'লগইন ব্যর্থ। মোবাইল নম্বর ও পাসওয়ার্ড ঠিক আছে কিনা দেখুন।';
        setServerError(msg);
        return;
      }

      // Adjust keys to your backend response
      const token: string | undefined =
        json?.token || json?.accessToken || json?.data?.accessToken;

      if (token) {
        const storage = data.remember ? localStorage : sessionStorage;
        storage.setItem('auth_token', token);
      }

      // Optional: store minimal user info if returned
      if (json?.user) {
        const storage = data.remember ? localStorage : sessionStorage;
        storage.setItem('auth_user', JSON.stringify(json.user));
      }

      // Redirect to your app home or dashboard
      router.push('/dashboard');
    } catch {
      setServerError('নেটওয়ার্ক ত্রুটি। কিছুক্ষণ পর আবার চেষ্টা করুন।');
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-linear-to-br from-background to-background/80 px-4'>
      <div className='w-full max-w-md bg-background border border-border rounded-2xl shadow-xl p-6 sm:p-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          আপনার অ্যাকাউন্টে লগইন করুন
        </h1>
        <p className='text-sm text-muted-foreground mb-4 text-center'>
          লগইন করতে আপনার ফোন নম্বর এবং পাসওয়ার্ড দিন
        </p>

        {serverError && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700'>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>
              ফোন নম্বর (Phone number)
            </label>
            <input
              type='tel'
              inputMode='tel'
              autoComplete='tel'
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
              placeholder='+8801XXXXXXXXX'
              title='01XXXXXXXXX অথবা +8801XXXXXXXXX'
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  // Accepts 01XXXXXXXXX or +8801XXXXXXXXX (Bangladesh mobile)
                  value: /^(?:\+?88)?01[3-9]\d{8}$/,
                  message:
                    'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX বা +8801XXXXXXXXX)',
                },
              })}
              aria-invalid={!!errors.phoneNumber}
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.phoneNumber.message as string}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>পাসওয়ার্ড</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                className='w-full rounded-lg border border-border bg-background px-3 py-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
                placeholder='••••••••'
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
                aria-invalid={!!errors.password}
                disabled={isSubmitting}
              />
              <button
                type='button'
                onClick={() => setShowPassword((s) => !s)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <label className='inline-flex items-center gap-2 text-xs'>
              <input
                type='checkbox'
                className='h-4 w-4 rounded border-border'
                defaultChecked
                {...register('remember')}
                disabled={isSubmitting}
              />
              আমাকে মনে রাখুন (Remember me)
            </label>

            <a
              href='/auth/forgot-password'
              className='text-xs text-primary hover:underline'
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60'
          >
            {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>

          <p className='text-[11px] text-muted-foreground text-center'>
            একাউন্ট নেই?{' '}
            <a href='/auth/register' className='text-primary hover:underline'>
              রেজিস্টার করুন
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
