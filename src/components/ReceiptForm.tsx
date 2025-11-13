'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type FormData = {
  tenantName: string;
  landlordName: string;
  address: string;
  month: string;
  year: string;
  rentAmount: string; // keep string for input formatting
  phone: string;
};

export const ReceiptForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    tenantName: false,
    landlordName: false,
    address: false,
    month: false,
    year: false,
    rentAmount: false,
    phone: false,
  });
  const firstInvalidRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  // Current + previous year window
  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return [String(y - 1), String(y), String(y + 1)];
  }, []);

  // Default to PREVIOUS month (most common use)
  const defaultForm: FormData = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return {
      tenantName: '',
      landlordName: '',
      address: '',
      month: months[d.getMonth()],
      year: String(d.getFullYear()),
      rentAmount: '',
      phone: '',
    };
  }, []);

  const [formData, setFormData] = useState<FormData>(defaultForm);

  useEffect(() => {
    setFormData(defaultForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- validation helpers ---
  const isEmpty = (s: string) => !s.trim();
  const isValidPhoneBD = (s: string) => /^01\d{9}$/.test(s); // 11 digits, starts with 01
  const isValidAmount = (s: string) => {
    if (!/^\d+(\.\d{1,2})?$/.test(s)) return false;
    const v = parseFloat(s);
    return v > 0 && v <= 1000000; // simple upper guard
  };

  const errors: Partial<Record<keyof FormData, string>> = {};
  if (isEmpty(formData.tenantName)) errors.tenantName = 'নাম প্রয়োজন';
  if (isEmpty(formData.landlordName)) errors.landlordName = 'নাম প্রয়োজন';
  if (isEmpty(formData.address)) errors.address = 'ঠিকানা প্রয়োজন';
  if (isEmpty(formData.month)) errors.month = 'মাস নির্বাচন করুন';
  if (isEmpty(formData.year)) errors.year = 'বছর নির্বাচন করুন';
  if (!isValidAmount(formData.rentAmount))
    errors.rentAmount = 'সঠিক পরিমাণ দিন (যেমন 12000 বা 12000.50)';
  if (!isValidPhoneBD(formData.phone))
    errors.phone = 'সঠিক ১১ সংখ্যার BD নম্বর দিন (01XXXXXXXXX)';

  const setField = (key: keyof FormData) => (value: string) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const onBlur = (key: keyof FormData) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // focus the first invalid field
    if (Object.keys(errors).length) {
      const order: (keyof FormData)[] = [
        'tenantName',
        'landlordName',
        'address',
        'month',
        'year',
        'rentAmount',
        'phone',
      ];
      const firstKey = order.find((k) => errors[k]);
      if (firstKey) {
        setTouched((t) => ({ ...t, [firstKey]: true }));
        firstInvalidRef.current?.focus();
      }
      toast.error('দয়া করে প্রয়োজনীয় তথ্যগুলো ঠিক করুন');
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      // Normalize payload
      const payload = {
        ...formData,
        rentAmount: parseFloat(formData.rentAmount).toFixed(2),
        month: formData.month,
        year: formData.year,
        phone: formData.phone,
      };

      console.log('Form data:', payload);
      toast.success('রসিদ তৈরি হচ্ছে…', {
        description: 'আপনার WhatsApp-এ শীঘ্রই PDF পাঠানো হবে',
      });
      setIsSubmitting(false);
    }, 1200);
  };

  // tie the ref to the first invalid field for focus management
  const refIfFirstInvalid = (key: keyof FormData) => {
    if (!errors[key]) return undefined;
    return (el: any) => {
      if (!firstInvalidRef.current) firstInvalidRef.current = el;
    };
  };

  // Sanitizers
  const sanitizeAmount = (v: string) =>
    v.replace(/[^\d.]/g, '').replace(/^0+(?=\d)/, '');
  const sanitizePhone = (v: string) => v.replace(/[^\d]/g, '').slice(0, 11);

  return (
    <section
      id='receipt-form'
      className='py-16 px-4 bg-card'
      aria-labelledby='receipt-form-title'
    >
      <div className='container mx-auto max-w-2xl'>
        <div className='bg-background rounded-2xl shadow-medium p-8 md:p-12'>
          <h2
            id='receipt-form-title'
            className='text-3xl md:text-4xl font-bold text-center mb-8 text-foreground'
          >
            রসিদের তথ্য দিন
          </h2>

          <form onSubmit={handleSubmit} noValidate className='space-y-6'>
            {/* Tenant */}
            <div className='space-y-2'>
              <Label htmlFor='tenantName' className='text-base'>
                ভাড়াটিয়ার নাম
              </Label>
              <Input
                id='tenantName'
                placeholder='আপনার নাম'
                value={formData.tenantName}
                onChange={(e) => setField('tenantName')(e.target.value)}
                onBlur={onBlur('tenantName')}
                aria-invalid={!!(touched.tenantName && errors.tenantName)}
                ref={refIfFirstInvalid('tenantName')}
                required
                className='text-lg py-6'
              />
              {touched.tenantName && errors.tenantName && (
                <p className='text-sm text-destructive'>{errors.tenantName}</p>
              )}
            </div>

            {/* Landlord */}
            <div className='space-y-2'>
              <Label htmlFor='landlordName' className='text-base'>
                বাড়িওয়ালার নাম
              </Label>
              <Input
                id='landlordName'
                placeholder='বাড়িওয়ালার নাম'
                value={formData.landlordName}
                onChange={(e) => setField('landlordName')(e.target.value)}
                onBlur={onBlur('landlordName')}
                aria-invalid={!!(touched.landlordName && errors.landlordName)}
                ref={refIfFirstInvalid('landlordName')}
                required
                className='text-lg py-6'
              />
              {touched.landlordName && errors.landlordName && (
                <p className='text-sm text-destructive'>
                  {errors.landlordName}
                </p>
              )}
            </div>

            {/* Address */}
            <div className='space-y-2'>
              <Label htmlFor='address' className='text-base'>
                ঠিকানা
              </Label>
              <Textarea
                id='address'
                placeholder='সম্পূর্ণ ঠিকানা লিখুন'
                value={formData.address}
                onChange={(e) => setField('address')(e.target.value)}
                onBlur={onBlur('address')}
                aria-invalid={!!(touched.address && errors.address)}
                ref={refIfFirstInvalid('address')}
                required
                rows={2}
                className='text-lg'
              />
              {touched.address && errors.address && (
                <p className='text-sm text-destructive'>{errors.address}</p>
              )}
            </div>

            {/* Month / Year */}
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='month' className='text-base'>
                  মাস
                </Label>
                <Select
                  value={formData.month}
                  onValueChange={(v) => setField('month')(v)}
                >
                  <SelectTrigger
                    id='month'
                    className='text-lg py-6'
                    aria-invalid={!!(touched.month && errors.month)}
                  >
                    <SelectValue placeholder='মাস নির্বাচন করুন' />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m, i) => (
                      <SelectItem key={i} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.month && errors.month && (
                  <p className='text-sm text-destructive'>{errors.month}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='year' className='text-base'>
                  বছর
                </Label>
                <Select
                  value={formData.year}
                  onValueChange={(v) => setField('year')(v)}
                >
                  <SelectTrigger
                    id='year'
                    className='text-lg py-6'
                    aria-invalid={!!(touched.year && errors.year)}
                  >
                    <SelectValue placeholder='বছর নির্বাচন করুন' />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.year && errors.year && (
                  <p className='text-sm text-destructive'>{errors.year}</p>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className='space-y-2'>
              <Label htmlFor='rentAmount' className='text-base'>
                ভাড়ার পরিমাণ (৳)
              </Label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground'>
                  ৳
                </span>
                <Input
                  id='rentAmount'
                  inputMode='decimal'
                  placeholder='12000'
                  value={formData.rentAmount}
                  onChange={(e) =>
                    setField('rentAmount')(sanitizeAmount(e.target.value))
                  }
                  onBlur={onBlur('rentAmount')}
                  aria-invalid={!!(touched.rentAmount && errors.rentAmount)}
                  ref={refIfFirstInvalid('rentAmount')}
                  required
                  className='text-lg py-6 pl-10'
                />
              </div>
              {touched.rentAmount && errors.rentAmount && (
                <p className='text-sm text-destructive'>{errors.rentAmount}</p>
              )}
              <p className='text-xs text-muted-foreground'>
                দুই দশমিক পর্যন্ত দেওয়া যাবে (যেমন 12000.50)
              </p>
            </div>

            {/* Phone */}
            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-base'>
                ফোন নম্বর
              </Label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg'>
                  🇧🇩
                </span>
                <Input
                  id='phone'
                  type='tel'
                  inputMode='numeric'
                  placeholder='01XXXXXXXXX'
                  value={formData.phone}
                  onChange={(e) =>
                    setField('phone')(sanitizePhone(e.target.value))
                  }
                  onBlur={onBlur('phone')}
                  aria-invalid={!!(touched.phone && errors.phone)}
                  ref={refIfFirstInvalid('phone')}
                  required
                  className='text-lg py-6 pl-14'
                />
              </div>
              {touched.phone && errors.phone && (
                <p className='text-sm text-destructive'>{errors.phone}</p>
              )}
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xl py-7 rounded-xl shadow-medium transition-smooth hover:scale-105 disabled:hover:scale-100'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  রসিদ তৈরি হচ্ছে...
                </>
              ) : (
                'রসিদ তৈরি করুন'
              )}
            </Button>

            <p className='text-center text-xs text-muted-foreground'>
              সাবমিটের পর রসিদটি স্বয়ংক্রিয়ভাবে WhatsApp-এ পাঠানো হবে।
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
