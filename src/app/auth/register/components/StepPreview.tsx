'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues, Step } from '../types';
import { SectionTitle, Divider } from './ui';
import Image from 'next/image';

export function StepReview({ goTo }: { goTo: (s: Step) => void }) {
  const { watch } = useFormContext<RegisterFormValues>();

  const phone = watch('landlord.address.phoneNumber');
  const firstName = watch('landlord.name.firstName');
  const lastName = watch('landlord.name.lastName');
  const gender = watch('landlord.gender');
  const email = watch('landlord.email');
  const photo = watch('landlord.profilePicture');

  const addr = watch('landlord.address');

  return (
    <section className='space-y-3'>
      <SectionTitle>রিভিউ ও কনফার্ম</SectionTitle>
      <Divider />
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='rounded-lg border border-border p-3'>
          <div className='mb-1 flex items-center justify-between'>
            <h3 className='text-sm font-semibold'>অ্যাকাউন্ট</h3>
            <button
              type='button'
              className='text-xs text-primary hover:underline'
              onClick={() => goTo(0)}
            >
              Edit
            </button>
          </div>
          <p className='text-xs'>ফোন: {phone || '—'}</p>
          <p className='text-xs text-muted-foreground'>পাসওয়ার্ড: ••••••••</p>
        </div>

        <div className='rounded-lg border border-border p-3'>
          <div className='mb-1 flex items-center justify-between'>
            <h3 className='text-sm font-semibold'>ব্যক্তিগত</h3>
            <button
              type='button'
              className='text-xs text-primary hover:underline'
              onClick={() => goTo(1)}
            >
              Edit
            </button>
          </div>
          <dl className='text-xs'>
            <dt className='text-muted-foreground'>নাম</dt>
            <dd className='mb-1'>
              {firstName} {lastName}
            </dd>
            <dt className='text-muted-foreground'>লিঙ্গ</dt>
            <dd className='mb-1'>{gender || '—'}</dd>
            <dt className='text-muted-foreground'>ইমেইল</dt>
            <dd className='mb-1'>{email || '—'}</dd>
            {photo && (
              <>
                <dt className='text-muted-foreground'>প্রোফাইল ছবি</dt>
                <dd className='mt-1'>
                  <Image
                    src={photo}
                    width={500}
                    height={500}
                    alt='Profile'
                    className='h-14 w-14 rounded-md object-cover border border-border'
                  />
                </dd>
              </>
            )}
          </dl>
        </div>

        <div className='rounded-lg border border-border p-3 sm:col-span-2'>
          <div className='mb-1 flex items-center justify-between'>
            <h3 className='text-sm font-semibold'>ঠিকানা</h3>
            <div className='flex gap-2'>
              <button
                type='button'
                className='text-xs text-primary hover:underline'
                onClick={() => goTo(2)}
              >
                Edit (এলাকা)
              </button>
              <button
                type='button'
                className='text-xs text-primary hover:underline'
                onClick={() => goTo(3)}
              >
                Edit (বাসা)
              </button>
            </div>
          </div>
          <p className='text-xs'>
            {addr.villaName}, {addr.flatNumber}, {addr.block}
            <br />
            {addr.roadName}, {addr.areaName}, {addr.policeStation},{' '}
            {addr.district}, {addr.division} {addr.postalCode}
            <br />
            {addr.landmark}
          </p>
        </div>
      </div>
    </section>
  );
}
