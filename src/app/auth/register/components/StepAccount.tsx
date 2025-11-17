'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../types';
import { Label, SectionTitle, Divider } from './ui';
import { PasswordStrength } from './PasswordStrength';

export function StepAccount() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordValue = watch('password');

  return (
    <section className='space-y-3'>
      <SectionTitle>অ্যাকাউন্ট তথ্য</SectionTitle>
      <Divider />
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <Label required htmlFor='phoneNumber'>
            ফোন নম্বর (Phone number)
          </Label>
          <input
            id='phoneNumber'
            type='tel'
            inputMode='tel'
            autoComplete='tel'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: +8801712345678'
            aria-invalid={!!errors.landlord?.address?.phoneNumber}
            {...register('landlord.address.phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\+?\d{7,15}$/,
                message: 'Use digits only, optionally with +',
              },
            })}
          />
          {errors.landlord?.address?.phoneNumber && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label required htmlFor='password'>
            পাসওয়ার্ড
          </Label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-16'
              placeholder='উদাহরণ: StrongPass123 / স্ট্রংপাস১২৩'
              aria-invalid={!!errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
              })}
            />
            <button
              type='button'
              onClick={() => setShowPassword((s) => !s)}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 border rounded-md hover:bg-muted'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.password.message}
            </p>
          )}

          <PasswordStrength password={passwordValue} />
        </div>
      </div>
    </section>
  );
}
