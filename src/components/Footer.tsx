import { MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      className='py-12 px-4 border-t border-border bg-card'
      aria-labelledby='footer-title'
    >
      <div className='container mx-auto max-w-6xl'>
        {/* Main Footer */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='text-center md:text-left'>
            <h3
              id='footer-title'
              className='text-2xl font-bold text-primary mb-1'
            >
              Rent Ezzi
            </h3>
            <p className='text-sm text-muted-foreground font-english'>
              Made with ❤️ in Bangladesh 🇧🇩
            </p>
          </div>

          <a
            href='https://wa.me/8801712345678'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 font-english font-medium'
          >
            <MessageCircle className='w-5 h-5' aria-hidden='true' />
            <span>WhatsApp Support</span>
          </a>
        </div>

        {/* Divider */}
        <div className='mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground space-y-2'>
          <p>© {new Date().getFullYear()} Rent Ezzi – সর্বস্বত্ব সংরক্ষিত</p>
          <p>
            <a href='#privacy' className='hover:text-primary transition-colors'>
              Privacy Policy
            </a>{' '}
            •{' '}
            <a href='#terms' className='hover:text-primary transition-colors'>
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
