'use client';

import { useEffect } from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

export function useFormDraft<T extends FieldValues>(
  methods: UseFormReturn<T>,
  storageKey: string,
) {
  const { watch, reset } = methods;

  // Restore
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as T;
      reset(parsed);
    } catch {
      // ignore parse errors
    }
  }, [reset, storageKey]);

  // Autosave
  useEffect(() => {
    const sub = watch((value) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
        // ignore quota errors
      }
    });
    return () => sub.unsubscribe();
  }, [watch, storageKey]);
}
