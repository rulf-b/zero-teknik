import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import QuoteSection from '@/components/home/QuoteSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ekran Sitesi - Profesyonel Ekran Çözümleri ve LED Ekranlar',
  description: 'Profesyonel ekran çözümleri, LED ekranlar, dijital tabelalar ve görsel sistemler için güvenilir hizmet. Kaliteli ürünler ve uzman destek ile işinizi büyütün.',
  keywords: 'LED ekran, dijital tabela, ekran çözümleri, görsel sistemler, profesyonel ekran',
  openGraph: {
    title: 'Ekran Sitesi - Profesyonel Ekran Çözümleri',
    description: 'Profesyonel ekran çözümleri ve LED ekranlar için güvenilir hizmet.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekran Sitesi - Profesyonel Ekran Çözümleri',
    description: 'Profesyonel ekran çözümleri ve LED ekranlar için güvenilir hizmet.',
  },
};

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <Services />
      <QuoteSection />
      <Testimonials />
      <BlogPreview />
    </div>
  );
}