import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { LiveCounter } from '@/components/LiveCounter';
import Navbar from '@/components/Navbar';
import { ReceiptForm } from '@/components/ReceiptForm';
import { TrustBadges } from '@/components/TrustBadges';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <LiveCounter />
      <ReceiptForm />
      <TrustBadges />
      <FAQ />
      <Footer />
    </div>
  );
};
export default HomePage;
