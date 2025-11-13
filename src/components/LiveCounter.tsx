'use client';

import { useEffect, useState, useRef } from 'react';

export const LiveCounter = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetCount = 1234;
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('bn-BD');
  };

  return (
    <div
      ref={counterRef}
      className='py-12 px-4 bg-primary/5 border-y border-primary/10'
    >
      <div className='container mx-auto max-w-4xl text-center'>
        <div className='inline-flex items-baseline gap-2'>
          <span className='text-5xl md:text-6xl font-bold text-primary'>
            {formatNumber(count)}
          </span>
          <span className='text-2xl md:text-3xl text-foreground'>
            টি রসিদ ইতিমধ্যে তৈরি
          </span>
        </div>
        <p className='text-muted-foreground font-english mt-2'>
          receipts generated so far
        </p>
      </div>
    </div>
  );
};
