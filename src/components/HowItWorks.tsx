import { Smartphone, FileEdit, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: Smartphone,
    step: '১',
    titleBn: 'ফোন নম্বর যাচাই',
    titleEn: 'Verify phone',
    lineBn: 'নম্বর দিন, OTP দিয়ে নিশ্চিত করুন।',
  },
  {
    icon: FileEdit,
    step: '২',
    titleBn: 'তথ্য পূরণ',
    titleEn: 'Enter details',
    lineBn: 'ভাড়াটিয়া, বাড়িওয়ালা, মাস ও পরিমাণ দিন।',
  },
  {
    icon: Send,
    step: '৩',
    titleBn: 'PDF পান',
    titleEn: 'Get PDF',
    lineBn: 'রসিদ WhatsApp-এ সাথে সাথে পাঠানো হবে।',
  },
];

export const HowItWorks = () => {
  return (
    <section
      id='how-it-works'
      className='py-16 px-4'
      aria-labelledby='how-it-works-title'
    >
      <div className='container mx-auto max-w-6xl'>
        <h2
          id='how-it-works-title'
          className='text-3xl md:text-4xl font-bold text-center mb-12 text-foreground'
        >
          কিভাবে কাজ করে
        </h2>

        <ol className='grid md:grid-cols-3 gap-8'>
          {steps.map(({ icon: Icon, step, titleBn, titleEn, lineBn }, i) => (
            <li key={i} className='list-none'>
              <Card
                className='relative p-8 text-center space-y-4 hover:shadow-medium transition-smooth hover:-translate-y-1'
                style={{ background: 'var(--gradient-card)' }}
                aria-label={`${step}: ${titleBn}`}
              >
                {/* Step badge */}
                <div className='absolute left-4 top-4 select-none'>
                  <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-background/80 border text-sm font-semibold'>
                    {step}
                  </span>
                </div>

                {/* Icon */}
                <div className='w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center'>
                  <Icon className='w-8 h-8 text-primary' aria-hidden='true' />
                </div>

                {/* Titles */}
                <h3 className='text-2xl font-semibold text-foreground'>
                  {titleBn}
                </h3>
                <p className='text-sm text-muted-foreground font-english'>
                  {titleEn}
                </p>

                {/* One-line instruction */}
                <p className='text-muted-foreground'>{lineBn}</p>
              </Card>
            </li>
          ))}
        </ol>

        {/* Tiny reassurance line */}
        <p className='mt-8 text-center text-sm text-muted-foreground'>
          🕒 পুরো প্রক্রিয়া ~১০ সেকেন্ড। কোনো সাইন-আপ লাগবে না।
        </p>
      </div>
    </section>
  );
};
