'use client';

import { useEffect, useState, useRef } from 'react';
import { User, Menu, X, ChevronDown } from 'lucide-react';

const links = [
  { href: '#how-it-works', labelBn: 'কিভাবে কাজ করে', labelEn: 'How it works' },
  { href: '#faq', labelBn: 'প্রশ্নোত্তর', labelEn: 'FAQ' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Scroll detection with throttle
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 6);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        userMenuRef.current &&
        target &&
        !userMenuRef.current.contains(target)
      ) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const links = menu.querySelectorAll('a, button');

    if (menuOpen) {
      // Stagger animation for menu items
      links.forEach((element, i) => {
        const link = element as HTMLElement;

        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        }, i * 50);
      });
    }
  }, [menuOpen]);

  const scrollToForm = () => {
    document
      .getElementById('receipt-form')
      ?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={[
        'sticky top-0 z-50 border-b transition-all duration-300',
        'backdrop-blur-md supports-[backdrop-filter]:bg-background/80',
        scrolled
          ? 'shadow-lg shadow-black/5 border-border/60 bg-background/95'
          : 'border-transparent bg-background/60',
      ].join(' ')}
      aria-label='Primary'
    >
      {/* Skip link */}
      <a
        href='#receipt-form'
        className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg transition-all focus:scale-105'
      >
        Skip to form
      </a>

      <nav className='mx-auto max-w-6xl px-4'>
        <div className='h-16 flex items-center justify-between'>
          {/* Brand with hover animation */}
          <a href='#' className='flex items-center gap-2 group relative'>
            <span className='text-xl font-bold tracking-tight text-primary relative'>
              Rent Ezzi
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
            </span>
            <span className='text-xs text-muted-foreground hidden sm:inline opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
              Bangladesh 🇧🇩
            </span>
          </a>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-6'>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className='relative text-sm text-foreground/80 hover:text-foreground transition-colors group py-2'
                style={{
                  animation: `fadeInDown 0.5s ease ${i * 0.1}s both`,
                }}
              >
                {l.labelBn}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
              </a>
            ))}

            {/* Login */}
            <a
              href='/auth/login'
              className='text-sm text-foreground/80 hover:text-foreground px-3 py-2 rounded-lg hover:bg-accent/10 transition-all duration-200'
            >
              লগইন
            </a>

            {/* Register */}
            <a
              href='/auth/register'
              className='relative inline-flex items-center justify-center rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent-foreground bg-background hover:bg-accent/10 transition-all duration-300 hover:scale-105 active:scale-95'
            >
              রেজিস্টার
            </a>
            <button
              onClick={scrollToForm}
              className='relative inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-accent-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 active:scale-95 overflow-hidden group'
            >
              <span className='relative z-10'>রসিদ তৈরি করুন</span>
              <span className='absolute inset-0 bg-gradient-to-r from-accent to-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></span>
            </button>

            {/* User Menu */}
            <div className='relative' ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className='relative inline-flex items-center justify-center rounded-full p-2.5 hover:bg-accent/10 transition-all duration-300 hover:scale-110 active:scale-95 group'
                aria-expanded={userMenuOpen}
                aria-haspopup='true'
              >
                <User className='w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors' />
                <ChevronDown
                  className={`w-3 h-3 ml-0.5 text-foreground/50 transition-transform duration-300 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />

                {/* Pulse effect */}
                <span className='absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300'></span>
              </button>

              {/* User Dropdown */}
              <div
                className={[
                  'absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right',
                  userMenuOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
                ].join(' ')}
              >
                <div className='p-3 border-b border-border bg-accent/5'>
                  <p className='text-sm font-medium'>Guest User</p>
                  <p className='text-xs text-muted-foreground'>
                    guest@rentezzi.com
                  </p>
                </div>
                <div className='py-2'>
                  <button className='w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors flex items-center gap-3'>
                    <User className='w-4 h-4' />
                    Profile
                  </button>
                  <button className='w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors flex items-center gap-3'>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    Settings
                  </button>
                  <div className='border-t border-border my-2'></div>
                  <button className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-3'>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile toggler with animation */}
          <button
            type='button'
            className='md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-accent/10 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50'
            aria-controls='mobile-menu'
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu
              className={`w-6 h-6 transition-all duration-300 ${
                menuOpen
                  ? 'opacity-0 rotate-90 scale-0'
                  : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-6 h-6 absolute transition-all duration-300 ${
                menuOpen
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 rotate-90 scale-0'
              }`}
            />
            <span className='sr-only'>
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu + backdrop */}
      <div
        id='mobile-menu'
        className={`md:hidden fixed inset-0 z-40 ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop with blur */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sheet with enhanced animation */}
        <div
          ref={mobileMenuRef}
          className={[
            'absolute right-0 top-0 h-full w-80 max-w-[85%] bg-background/95 backdrop-blur-xl border-l border-border',
            'transition-all duration-300 ease-out',
            menuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0',
            'shadow-2xl',
          ].join(' ')}
          role='dialog'
          aria-modal='true'
        >
          <div className='p-4 flex items-center justify-between border-b border-border bg-accent/5'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center'>
                <User className='w-4 h-4 text-accent-foreground' />
              </div>
              <span className='text-base font-semibold'>মেনু</span>
            </div>
            <button
              className='inline-flex items-center justify-center rounded-lg p-2 hover:bg-accent/10 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50'
              onClick={() => setMenuOpen(false)}
            >
              <span className='sr-only'>Close</span>
              <X className='w-5 h-5' />
            </button>
          </div>
          <div className='p-4 flex flex-col gap-2 bg-gray-100'>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className='rounded-lg px-4 py-3 text-base text-foreground/90 hover:bg-accent/10 transition-all duration-300 hover:translate-x-1 active:scale-95 flex items-center justify-between group'
              >
                <span>{l.labelBn}</span>
                <span className='text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'>
                  ({l.labelEn})
                </span>
              </a>
            ))}

            <button
              onClick={scrollToForm}
              className='mt-4 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3.5 text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 relative overflow-hidden group'
            >
              <span className='relative z-10'>রসিদ তৈরি করুন</span>
              <span className='absolute inset-0 bg-gradient-to-r from-accent/80 to-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300'></span>
            </button>

            {/* NEW: Login / Register */}
            <div className='mt-3 flex gap-2'>
              <a
                href='/auth/login'
                onClick={() => setMenuOpen(false)}
                className='flex-1 inline-flex items-center justify-center rounded-lg border border-border px-4 py-3 text-sm text-foreground/90 hover:bg-accent/10 transition-all duration-300 hover:scale-[1.02] active:scale-95'
              >
                লগইন
              </a>
              <a
                href='/auth/register'
                onClick={() => setMenuOpen(false)}
                className='flex-1 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-95'
              >
                রেজিস্টার
              </a>
            </div>

            {/* User section in mobile */}
            <div className='mt-6 pt-6 border-t border-border bg-'>
              <div className='flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/5'>
                <div className='w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center'>
                  <User className='w-5 h-5 text-accent-foreground' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Guest User</p>
                  <p className='text-xs text-muted-foreground'>
                    guest@rentezzi.com
                  </p>
                </div>
              </div>

              <div className='mt-3 space-y-1'>
                <button className='w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 rounded-lg transition-all duration-300 hover:translate-x-1'>
                  Profile Settings
                </button>
                <button className='w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-300 hover:translate-x-1'>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className='mt-auto p-4 border-t border-border text-xs text-muted-foreground text-center'>
            <p className='flex items-center justify-center gap-2'>
              Built in Bangladesh
              <span className='inline-block animate-pulse'>🇧🇩</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
