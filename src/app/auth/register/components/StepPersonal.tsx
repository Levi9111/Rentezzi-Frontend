'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../types';
import { Label, SectionTitle, Divider } from './ui';
import Image from 'next/image';

export function StepPersonal() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const profilePreview = watch('landlord.profilePicture');

  const handleProfileFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      setValue('landlord.profilePicture', '');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image should be under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setValue('landlord.profilePicture', dataUrl, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className='space-y-3'>
      <SectionTitle>ব্যক্তিগত তথ্য</SectionTitle>
      <Divider />
      <div className='grid gap-4 sm:grid-cols-3'>
        <div>
          <Label required htmlFor='firstName'>
            প্রথম নাম
          </Label>
          <input
            id='firstName'
            type='text'
            autoComplete='given-name'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: John / জন'
            aria-invalid={!!errors.landlord?.name?.firstName}
            {...register('landlord.name.firstName', {
              required: 'First name is required',
            })}
          />
          {errors.landlord?.name?.firstName && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.name.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Label optional htmlFor='lastName'>
            শেষ নাম
          </Label>
          <input
            id='lastName'
            type='text'
            autoComplete='family-name'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: Doe / দে'
            {...register('landlord.name.lastName')}
          />
        </div>

        <div>
          <Label required htmlFor='gender'>
            লিঙ্গ
          </Label>
          <select
            id='gender'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            aria-invalid={!!errors.landlord?.gender}
            {...register('landlord.gender', { required: 'Gender is required' })}
          >
            <option value=''>নির্বাচন করুন</option>
            <option value='male'>পুরুষ</option>
            <option value='female'>মহিলা</option>
            <option value='other'>অন্যান্য</option>
          </select>
          {errors.landlord?.gender && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.gender.message}
            </p>
          )}
        </div>

        <div className='sm:col-span-2'>
          <Label optional htmlFor='email'>
            ইমেইল
          </Label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='উদাহরণ: landlord@example.com'
            {...register('landlord.email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email',
              },
            })}
          />
          {errors.landlord?.email && (
            <p className='mt-1 text-xs text-red-500'>
              {String(errors.landlord.email.message)}
            </p>
          )}
        </div>

        <div>
          <Label optional htmlFor='profilePictureFile'>
            প্রোফাইল ছবি
          </Label>
          <input
            id='profilePictureFile'
            type='file'
            accept='image/*'
            className='block w-full text-sm file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-1.5 file:text-sm hover:file:bg-muted/80'
            onChange={handleProfileFileChange}
          />
          <input type='hidden' {...register('landlord.profilePicture')} />
          {profilePreview && (
            <Image
              src={profilePreview}
              width={400}
              height={400}
              alt='Profile preview'
              className='mt-2 h-16 w-16 rounded-md object-cover border border-border'
            />
          )}
          <p className='text-[11px] text-muted-foreground mt-1'>
            JPG/PNG, up to ~2MB.
          </p>
        </div>
      </div>
    </section>
  );
}
