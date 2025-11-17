'use client';

import React from 'react';
import { strengthOf } from '../utils';

export function PasswordStrength({ password }: { password: string }) {
  const score = React.useMemo(() => strengthOf(password), [password]);
  return (
    <div className='mt-2 space-y-1'>
      <div className='flex gap-1'>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={[
              'h-1.5 w-1/4 rounded-full',
              i < score ? 'bg-green-500' : 'bg-muted',
            ].join(' ')}
          />
        ))}
      </div>
      <p className='text-[11px] text-muted-foreground'>
        পরামর্শ: ১০+ ক্যারেক্টার, বড়/ছোট অক্ষর, সংখ্যা ও চিহ্ন মেশান।
      </p>
    </div>
  );
}
