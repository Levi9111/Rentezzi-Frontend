import type { Path } from 'react-hook-form';
import type { RegisterFormValues, Step } from '../types';

export const STEPS = [
  { id: 0 as Step, label: 'অ্যাকাউন্ট' },
  { id: 1 as Step, label: 'ব্যক্তিগত' },
  { id: 2 as Step, label: 'ঠিকানা (এলাকা)' },
  { id: 3 as Step, label: 'ঠিকানা (বাসা)' },
  { id: 4 as Step, label: 'রিভিউ' },
] as const;

export const STEP_FIELDS: Record<Step, Path<RegisterFormValues>[]> = {
  0: ['password', 'landlord.address.phoneNumber'],
  1: ['landlord.name.firstName', 'landlord.gender'],
  2: [
    'landlord.address.division',
    'landlord.address.district',
    'landlord.address.policeStation',
    'landlord.address.areaName',
    'landlord.address.roadName',
    'landlord.address.postalCode',
  ],
  3: [
    'landlord.address.villaName',
    'landlord.address.flatNumber',
    'landlord.address.block',
    'landlord.address.landmark',
  ],
  4: [],
};

export const LS_KEY = 'rent-receipt:landlord-register-draft:v1';
