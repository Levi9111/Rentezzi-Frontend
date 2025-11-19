'use client';

import { useForm, FormProvider } from 'react-hook-form';

import type { RegisterFormValues, Step } from './types';
import { useFormDraft } from './hooks/useFormDraft';
import { STEPS, STEP_FIELDS, LS_KEY } from './constants/steps';

import { Stepper } from './components/Stepper';
import { StepAccount } from './components/StepAccount';
import { StepPersonal } from './components/StepPersonal';
import { StepAddressArea } from './components/StepAddressArea';
import { StepAddressHome } from './components/StepAddressHome';
import { StepReview } from './components/StepPreview';
import { useState } from 'react';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useAlert } from '@/components/alert/AlertProvider';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(0);
  const [register, { isLoading, error }] = useRegisterMutation();
  const lastStep = STEPS[STEPS.length - 1].id;

  const methods = useForm<RegisterFormValues>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      landlord: {
        name: { firstName: '', lastName: '' },
        email: '',
        gender: '',
        profilePicture: '',
        address: {
          villaName: '',
          division: '',
          district: '',
          policeStation: '',
          areaName: '',
          roadName: '',
          postalCode: '',
          phoneNumber: '',
          houseNumber: '',
          floorNumber: '',
          directions: '',
          flatNumber: '',
          block: '',
          landmark: '',
        },
      },
    },
  });

  const {
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods;

  const { showAlert } = useAlert();

  // Restore + autosave
  // useFormDraft(methods, LS_KEY);

  const clampStep = (val: number): Step =>
    Math.max(0, Math.min(4, val)) as Step;

  const goNext = async () => {
    const ok = await trigger(
      STEP_FIELDS[step] as Parameters<typeof trigger>[0],
      { shouldFocus: true },
    );
    if (ok) setStep((s) => clampStep(s + 1));
  };

  const goBack = () => setStep((s) => clampStep(s - 1));

  const onSubmit = async (data: RegisterFormValues) => {
    if (step !== lastStep) {
      await goNext();
      return;
    }

    console.log(data);

    try {
      const result = await register({
        password: data.password,
        landlord: data.landlord,
      });

      console.log(result);
      showAlert('success', 'রেজিস্ট্রেশন সফল হয়েছে!');
    } catch (error) {
      showAlert('error', 'রেজিস্ট্রেশন ব্যর্থ হয়েছে!');
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <main className='min-h-screen bg-linear-to-br from-background to-background/80 px-4 py-8'>
        <div className='max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-xl p-6 sm:p-8'>
          <h1 className='text-2xl font-bold mb-2 text-center'>
            নতুন ল্যান্ডলর্ড রেজিস্ট্রেশন
          </h1>
          <p className='text-sm text-muted-foreground text-center'>
            মাত্র কয়েকটি ধাপে তথ্য দিন—শেষে একবারে রিভিউ করবেন।
          </p>
          <p className='text-xs text-muted-foreground mb-6 text-center'>
            ইতোমধ্যে একাউন্ট আছে?{' '}
            <a
              href='/auth/login'
              className='font-semibold text-primary hover:underline'
            >
              লগইন করুন
            </a>
          </p>

          {/* Stepper */}
          <Stepper step={step} steps={STEPS} />

          <p className='text-xs text-muted-foreground mb-4 text-center'>
            <span className='text-red-500 mr-1'>*</span> চিহ্নিত ঘরগুলো আবশ্যিক।
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && step !== STEPS.length - 1) {
                e.preventDefault();
                await goNext();
              }
            }}
          >
            {step === 0 && <StepAccount />}
            {step === 1 && <StepPersonal />}
            {step === 2 && <StepAddressArea />}
            {step === 3 && <StepAddressHome />}
            {step === 4 && <StepReview goTo={setStep} />}

            {/* Navigation */}
            <div className='flex items-center justify-between pt-2'>
              {step > 0 ? (
                <button
                  type='button'
                  onClick={goBack}
                  className='inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted'
                >
                  পিছনে যান
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type='button'
                  onClick={goNext}
                  className='inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-95'
                >
                  পরবর্তী ধাপ
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60'
                >
                  {isSubmitting
                    ? 'রেজিস্টার হচ্ছে...'
                    : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </FormProvider>
  );
}
