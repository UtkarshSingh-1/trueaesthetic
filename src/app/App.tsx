import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingPage } from './pages/BookingPage';
import { ServicePage } from './pages/ServicePage';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy-load all below-the-fold sections
const Philosophy = lazy(() =>
  import('./components/Philosophy').then((m) => ({ default: m.Philosophy }))
);
const Treatments = lazy(() =>
  import('./components/Treatments').then((m) => ({ default: m.Treatments }))
);
const Results = lazy(() =>
  import('./components/Results').then((m) => ({ default: m.Results }))
);
const WhyChooseUs = lazy(() =>
  import('./components/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs }))
);
const Team = lazy(() =>
  import('./components/Team').then((m) => ({ default: m.Team }))
);
const CTA = lazy(() =>
  import('./components/CTA').then((m) => ({ default: m.CTA }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const BackToTop = lazy(() =>
  import('./components/BackToTop').then((m) => ({ default: m.BackToTop }))
);

function SectionFallback() {
  return <div aria-hidden />;
}

function HomePage() {
  useEffect(() => {
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
        <Suspense fallback={<SectionFallback />}>
          <div id="philosophy"><Philosophy /></div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div id="treatments"><Treatments /></div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div id="results"><Results /></div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div id="why"><WhyChooseUs /></div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div id="team"><Team /></div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div id="contact"><CTA /></div>
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        {/* Catch-all → home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
