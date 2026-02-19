import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Treatments } from './components/Treatments';
import { Results } from './components/Results';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Team } from './components/Team';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4F1] text-[#2D2A26] overflow-x-hidden">
      <Header />
      
      <main>
        <Hero />
        
        <div id="philosophy">
          <Philosophy />
        </div>
        
        <div id="treatments">
          <Treatments />
        </div>
        
        <div id="results">
          <Results />
        </div>
        
        <div id="why">
          <WhyChooseUs />
        </div>
        
        <div id="team">
          <Team />
        </div>
        
        <div id="contact">
          <CTA />
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
