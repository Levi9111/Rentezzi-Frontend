import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Keep answers short, specific, and action-oriented
const faqs = [
  {
    q: 'রসিদ কি আইনগতভাবে গ্রহণযোগ্য?',
    a: 'রসিদে তারিখ, পরিমাণ, ভাড়াটিয়া/বাড়িওয়ালার নাম, ঠিকানা ও QR যাচাইকরণ থাকে—যা সাধারণত অফিসিয়াল রেকর্ড হিসেবে গ্রহণযোগ্য। বিশেষ প্রতিষ্ঠানের আলাদা নীতি থাকলে তাদের নির্দেশনা অনুসরণ করুন।',
  },
  {
    q: 'WhatsApp-এ কিভাবে পাব?',
    a: 'ফর্ম সাবমিট করলে ৫–১০ সেকেন্ডের মধ্যে আপনার দেওয়া নম্বরে PDF চলে যাবে। না পেলে আবার চেষ্টা করুন বা নম্বরটি ঠিক আছে কি না দেখুন।',
  },
  {
    q: 'খরচ কত?',
    a: 'প্রথম ৩টি রসিদ সম্পূর্ণ ফ্রি। এরপর প্রতি রসিদে মাত্র ১০ টাকা।',
  },
  {
    q: 'ইমেইল লাগবে?',
    a: 'না। কেবল ফোন নম্বরই যথেষ্ট। চাইলে পরে ইমেইলেও পাঠাতে পারবেন।',
  },
  {
    q: 'ভুল হলে কি সংশোধন করা যাবে?',
    a: 'হ্যাঁ। ভুল তথ্য দিলে নতুন রসিদ সঙ্গে সঙ্গে তৈরি করতে পারবেন। প্রয়োজন হলে আগেরটি বাতিল/নোটেড হিসেবে চিহ্নিত হবে।',
  },
  {
    q: 'একসাথে একাধিক মাসের রসিদ?',
    a: 'হ্যাঁ। আলাদা আলাদা মাস সিলেক্ট করে দ্রুত একাধিক রসিদ জেনারেট করা যায়।',
  },
  {
    q: 'ডেটা নিরাপত্তা?',
    a: 'আপনার তথ্য নিরাপদে প্রক্রিয়াকরণ করা হয়। আমরা কেবল রসিদ তৈরির জন্য প্রয়োজনীয় তথ্য রাখি এবং অপ্রয়োজনীয়ভাবে শেয়ার করি না।',
  },
  {
    q: 'পেমেন্ট কিভাবে?',
    a: 'ফ্রি কোটার পর মোবাইল পেমেন্ট (যেমন bKash/Nagad) সাপোর্ট করা হয়। রসিদ তৈরি করার আগে মোট খরচ দেখানো হবে।',
  },
];

export const FAQ = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 6).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <section id='faq' className='py-16 px-4' aria-labelledby='faq-title'>
      <div className='container mx-auto max-w-3xl'>
        <h2
          id='faq-title'
          className='text-3xl md:text-4xl font-bold text-center mb-12 text-foreground'
        >
          সাধারণ প্রশ্ন
        </h2>

        <Accordion type='single' collapsible className='space-y-4'>
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className='bg-card rounded-xl border border-border/60 shadow-soft focus-within:ring-1 focus-within:ring-primary/40'
            >
              <AccordionTrigger className='px-6 text-lg font-semibold text-left hover:text-primary focus:outline-none'>
                {item.q}
              </AccordionTrigger>
              <AccordionContent className='px-6 pb-4 text-muted-foreground'>
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* tiny reassurance + contact */}
        <p className='mt-6 text-center text-sm text-muted-foreground'>
          আরও প্রশ্ন? WhatsApp-এ লিখুন—আমরা দ্রুত উত্তর দিই।
        </p>

        {/* SEO: FAQPage structured data (safe to include on page once) */}
        <script
          type='application/ld+json'
          // If using Next.js, this is fine inside the component; otherwise move to <Head/>
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
};
