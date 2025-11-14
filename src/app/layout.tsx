import type { Metadata } from 'next';
import { Hind_Siliguri, Inter } from 'next/font/google';
import './globals.css';
// import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReduxProvider } from '@/redux/ReduxProvider';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-bengali',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-english',
});

export const metadata: Metadata = {
  title: 'ভাড়ার রসিদ জেনারেটর – ১০ সেকেন্ডে PDF | Rent Ezzi',
  description:
    'বাড়ির মালিক কে ভাড়া দিলেন? ১০ সেকেন্ডে অফিসিয়াল PDF রসিদ বানান, WhatsApp-এ পান। সম্পূর্ণ ফ্রি, কোনো ইমেইল লাগবে না।',
  authors: [{ name: 'Rent Ezzi' }],
  openGraph: {
    title: 'ভাড়ার রসিদ জেনারেটর – ১০ সেকেন্ডে PDF | Rent Ezzi',
    description:
      'বাড়ির মালিক কে ভাড়া দিলেন? ১০ সেকেন্ডে অফিসিয়াল PDF রসিদ বানান, WhatsApp-এ পান।',
    type: 'website',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RentEzzi',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='bn' className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body>
        <TooltipProvider>
          <ReduxProvider>{children}</ReduxProvider>
          {/* <Toaster /> */}
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
