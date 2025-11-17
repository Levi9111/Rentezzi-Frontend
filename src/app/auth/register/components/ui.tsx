'use client';

import React from 'react';

export function Label({
  children,
  required,
  optional,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className='block text-sm font-medium mb-1'>
      <span>{children}</span>
      {required && <span className='text-red-500 ml-0.5'>*</span>}
      {optional && (
        <span className='text-xs text-muted-foreground ml-1'>
          (ঐচ্ছিক / Optional)
        </span>
      )}
    </label>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className='text-sm font-semibold'>{children}</h2>;
}

export function Divider() {
  return <div className='h-px bg-border my-1' />;
}
