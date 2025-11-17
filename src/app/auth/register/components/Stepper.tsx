'use client';

import type { Step } from '../types';

type StepperProps = {
  step: Step;
  steps: readonly { id: Step; label: string }[];
};

export function Stepper({ step, steps }: StepperProps) {
  const lastStep = steps[steps.length - 1].id;
  const progressPercent = Math.round((step / lastStep) * 100);

  return (
    <div className='mb-6'>
      <ol className='flex items-center justify-between text-xs sm:text-sm'>
        {steps.map((s, idx) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className='flex-1'>
              <div className='flex items-center gap-2'>
                <div
                  className={[
                    'h-6 w-6 shrink-0 rounded-full border flex items-center justify-center',
                    done
                      ? 'bg-primary text-primary-foreground border-primary'
                      : active
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-muted text-foreground/60 border-border',
                  ].join(' ')}
                >
                  {idx + 1}
                </div>
                <span
                  className={[
                    'hidden sm:block',
                    done || active
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {s.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <div className='mt-3 h-2 bg-muted rounded-full overflow-hidden'>
        <div
          className='h-full bg-primary transition-all'
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
