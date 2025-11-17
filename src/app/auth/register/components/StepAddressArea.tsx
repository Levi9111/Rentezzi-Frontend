'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../types';
import { Label, SectionTitle, Divider } from './ui';
import {
  DIVISION_LIST,
  DISTRICTS_BY_DIVISION_MAP,
  PS_BY_DISTRICT_MAP,
} from '../constants/bd';

export function StepAddressArea() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext<RegisterFormValues>();

  const selectedDivision = watch('landlord.address.division');
  const selectedDistrict = watch('landlord.address.district');
  const selectedPS = watch('landlord.address.policeStation');

  const divisionOptions = React.useMemo(() => DIVISION_LIST, []);
  const districtOptions = React.useMemo(
    () =>
      selectedDivision ? DISTRICTS_BY_DIVISION_MAP[selectedDivision] || [] : [],
    [selectedDivision],
  );
  const psOptions = React.useMemo(
    () => (selectedDistrict ? PS_BY_DISTRICT_MAP[selectedDistrict] || [] : []),
    [selectedDistrict],
  );

  // If Division changes and current District not valid, reset downstream
  React.useEffect(() => {
    if (!selectedDivision) return;
    if (selectedDistrict && !districtOptions.includes(selectedDistrict)) {
      setValue('landlord.address.district', '');
      setValue('landlord.address.policeStation', '');
      setValue('landlord.address.postalCode', '');
      clearErrors([
        'landlord.address.district',
        'landlord.address.policeStation',
        'landlord.address.postalCode',
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDivision, districtOptions]);

  // If District changes, clear PS + Postal
  React.useEffect(() => {
    setValue('landlord.address.policeStation', '');
    setValue('landlord.address.postalCode', '');
    clearErrors([
      'landlord.address.policeStation',
      'landlord.address.postalCode',
    ]);
  }, [selectedDistrict, setValue, clearErrors]);

  // When PS changes, auto-fill Postal (editable)
  React.useEffect(() => {
    if (!selectedDistrict || !selectedPS) return;
    const match = (PS_BY_DISTRICT_MAP[selectedDistrict] || []).find(
      (p) => p.name === selectedPS,
    );
    if (match?.postalCode) {
      setValue('landlord.address.postalCode', match.postalCode, {
        shouldDirty: true,
      });
      clearErrors('landlord.address.postalCode');
    }
  }, [selectedDistrict, selectedPS, setValue, clearErrors]);

  return (
    <section className='space-y-3'>
      <SectionTitle>ঠিকানা তথ্য — এলাকা</SectionTitle>
      <Divider />
      <div className='grid gap-4 sm:grid-cols-2'>
        {/* Division */}
        <div>
          <Label required htmlFor='division'>
            বিভাগ
          </Label>
          <select
            id='division'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            aria-invalid={!!errors.landlord?.address?.division}
            {...register('landlord.address.division', {
              required: 'Division is required',
            })}
          >
            <option value=''>Select division</option>
            {divisionOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.landlord?.address?.division && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.division.message}
            </p>
          )}
        </div>

        {/* District */}
        <div>
          <Label required htmlFor='district'>
            জেলা
          </Label>
          <select
            id='district'
            disabled={!selectedDivision}
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-60'
            aria-invalid={!!errors.landlord?.address?.district}
            {...register('landlord.address.district', {
              required: 'District is required',
            })}
          >
            <option value=''>
              {selectedDivision ? 'Select district' : 'Select division first'}
            </option>
            {districtOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.landlord?.address?.district && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.district.message}
            </p>
          )}
        </div>

        {/* Police Station */}
        <div className='sm:col-span-2'>
          <Label required htmlFor='policeStation'>
            থানা (Police Station)
          </Label>
          {psOptions.length > 0 ? (
            <select
              id='policeStation'
              disabled={!selectedDistrict}
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-60'
              aria-invalid={!!errors.landlord?.address?.policeStation}
              {...register('landlord.address.policeStation', {
                required: 'Police station is required',
              })}
            >
              <option value=''>
                {selectedDistrict
                  ? 'Select police station'
                  : 'Select district first'}
              </option>
              {psOptions.map((ps) => (
                <option key={ps.name} value={ps.name}>
                  {ps.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <input
                id='policeStation'
                type='text'
                disabled={!selectedDistrict}
                className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-60'
                placeholder={
                  selectedDistrict
                    ? 'Type police station'
                    : 'Select district first'
                }
                aria-invalid={!!errors.landlord?.address?.policeStation}
                {...register('landlord.address.policeStation', {
                  required: 'Police station is required',
                })}
              />
              <p className='mt-1 text-[11px] text-muted-foreground'>
                No predefined list for this district yet — typed value is
                allowed.
              </p>
            </>
          )}
          {errors.landlord?.address?.policeStation && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.policeStation.message}
            </p>
          )}
        </div>

        {/* Area */}
        <div>
          <Label required htmlFor='areaName'>
            এরিয়া / মহল্লা
          </Label>
          <input
            id='areaName'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='West Shewrapara / ওয়েস্ট শেওড়াপাড়া'
            aria-invalid={!!errors.landlord?.address?.areaName}
            {...register('landlord.address.areaName', {
              required: 'Area name is required',
            })}
          />
          {errors.landlord?.address?.areaName && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.areaName.message}
            </p>
          )}
        </div>

        {/* Road */}
        <div>
          <Label required htmlFor='roadName'>
            রোডের নাম
          </Label>
          <input
            id='roadName'
            type='text'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='Mirpur Road / মিরপুর রোড'
            aria-invalid={!!errors.landlord?.address?.roadName}
            {...register('landlord.address.roadName', {
              required: 'Road name is required',
            })}
          />
          {errors.landlord?.address?.roadName && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.roadName.message}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <Label required htmlFor='postalCode'>
            পোস্টাল কোড
          </Label>
          <input
            id='postalCode'
            type='text'
            inputMode='numeric'
            autoComplete='postal-code'
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
            placeholder='e.g., 8200'
            aria-invalid={!!errors.landlord?.address?.postalCode}
            {...register('landlord.address.postalCode', {
              required: 'Postal code is required',
              pattern: { value: /^[0-9]{3,10}$/, message: 'Digits only' },
            })}
          />
          {errors.landlord?.address?.postalCode && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.landlord.address.postalCode.message}
            </p>
          )}
          {selectedPS && (
            <p className='mt-1 text-[11px] text-muted-foreground'>
              Auto‑filled from police station; you can edit if needed.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
