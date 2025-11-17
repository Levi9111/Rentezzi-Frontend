'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../types';
import { Label, SectionTitle, Divider } from './ui';

export function StepAddressHome() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <section className='space-y-3'>
      <SectionTitle>ঠিকানা তথ্য — বাসা</SectionTitle>
      <Divider />
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <Label required htmlFor='villaName'>
            ভিলা / বিল্ডিংয়ের নাম
          </Label>
          <input
            id='villaName'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: Saima Tower / সাইমা টাওয়ার'
            aria-invalid={!!errors.landlord?.address?.villaName}
            {...register('landlord.address.villaName', {
              required: 'Villa name is required',
            })}
          />
          {errors.landlord?.address?.villaName && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.villaName.message}
            </p>
          )}
        </div>

        <div>
          <Label required htmlFor='flatNumber'>
            ফ্ল্যাট নম্বর
          </Label>
          <input
            id='flatNumber'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: Flat-B2, Apt-5C, Unit-401'
            aria-invalid={!!errors.landlord?.address?.flatNumber}
            {...register('landlord.address.flatNumber', {
              required: 'Flat number is required',
            })}
          />
          {errors.landlord?.address?.flatNumber && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.flatNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label required htmlFor='block'>
            ব্লক / সেকশন
          </Label>
          <input
            id='block'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: Block-C, Sector-3, Phase-2'
            aria-invalid={!!errors.landlord?.address?.block}
            {...register('landlord.address.block', {
              required: 'Block is required',
            })}
          />
          {errors.landlord?.address?.block && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.block.message}
            </p>
          )}
        </div>

        <div className='sm:col-span-2'>
          <Label required htmlFor='landmark'>
            ল্যান্ডমার্ক
          </Label>
          <input
            id='landmark'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: মোহাম্মদপুর বাসস্ট্যান্ডের কাছে'
            aria-invalid={!!errors.landlord?.address?.landmark}
            {...register('landlord.address.landmark', {
              required: 'Landmark is required',
            })}
          />
          {errors.landlord?.address?.landmark && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.landmark.message}
            </p>
          )}
        </div>

        {/* Optional details */}
        <div className='sm:col-span-2'>
          <details className='rounded-lg border border-border p-3'>
            <summary className='cursor-pointer text-sm font-medium'>
              অতিরিক্ত ঠিকানা বিস্তারিত (ঐচ্ছিক / Optional)
            </summary>
            <div className='mt-3 grid gap-4 sm:grid-cols-3'>
              <div>
                <Label optional htmlFor='houseNumber'>
                  বাড়ি নম্বর
                </Label>
                <input
                  id='houseNumber'
                  type='text'
                  className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
                  placeholder='উদাহরণ: 43/A, 12, 156 (Old 84)'
                  {...register('landlord.address.houseNumber')}
                />
              </div>
              <div>
                <Label optional htmlFor='floorNumber'>
                  ফ্লোর / তলা
                </Label>
                <input
                  id='floorNumber'
                  type='text'
                  className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
                  placeholder='উদাহরণ: ৩য় তলা / 3rd floor'
                  {...register('landlord.address.floorNumber')}
                />
              </div>
              <div className='sm:col-span-3'>
                <Label optional htmlFor='directions'>
                  নির্দেশনা
                </Label>
                <input
                  id='directions'
                  type='text'
                  className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
                  placeholder='উদাহরণ: জনতা ব্যাংকের বিপরীতে'
                  {...register('landlord.address.directions')}
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
