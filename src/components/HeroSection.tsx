'use client';

import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.png';
import Image from 'next/image';

export const HeroSection = () => {
  const scrollToForm = () => {
    document
      .getElementById('receipt-form')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className='relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12'
      aria-labelledby='hero-title'
      role='region'
    >
      <div
        className='absolute inset-0 z-0 opacity-50'
        style={{ background: 'var(--gradient-hero)' }}
        aria-hidden='true'
      />

      <div className='container mx-auto max-w-6xl z-10'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Copy block */}
          <div className='text-center md:text-left space-y-6 animate-fade-in'>
            <h1
              id='hero-title'
              className='text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight'
            >
              ১০ সেকেন্ডে অফিসিয়াল ভাড়ার রসিদ
            </h1>

            <p className='text-lg md:text-xl text-muted-foreground font-english'>
              Create compliant rent receipts in seconds — instant PDF to
              WhatsApp & email.
            </p>

            {/* Trust/utility chips */}
            <ul className='flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground'>
              <li className='px-3 py-1 rounded-full bg-background/70 border'>
                PDF ready
              </li>
              <li className='px-3 py-1 rounded-full bg-background/70 border'>
                WhatsApp delivery
              </li>
              <li className='px-3 py-1 rounded-full bg-background/70 border'>
                বাংলা & English
              </li>
              <li className='px-3 py-1 rounded-full bg-background/70 border'>
                No sign-up
              </li>
            </ul>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center md:items-start'>
              <Button
                onClick={scrollToForm}
                size='lg'
                className='bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xl px-8 py-6 rounded-xl shadow-medium transition-smooth hover:scale-105'
              >
                রসিদ তৈরি করুন
              </Button>

              <Button
                variant='outline'
                size='lg'
                onClick={() =>
                  document
                    .getElementById('how-it-works')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='font-semibold text-xl px-8 py-6 rounded-xl shadow-medium transition-smooth'
              >
                ডেমো দেখুন
              </Button>
            </div>

            {/* Social proof / reassurance */}
            <p className='text-sm text-muted-foreground'>
              ফ্রি ট্রাই করুন — মাত্র নাম ও পরিমাণ দিলেই হবে।
            </p>
          </div>

          {/* Illustration */}
          <div className='relative animate-scale-in'>
            <Image
              src={heroImage}
              alt='ভাড়াটিয়া ও বাড়িওয়ালার মধ্যে ভাড়া পরিশোধ ও রসিদ নেওয়ার ইলাস্ট্রেশন'
              className='w-full h-auto rounded-2xl shadow-medium'
              loading='eager'
              decoding='async'
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
