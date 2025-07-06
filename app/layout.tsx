"use client";
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { CallButton } from '@/components/ui/WhatsAppButton';
import { PricesProvider } from '@/lib/PricesContext';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

function isMobileUserAgent(ua: any) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
}

function MobileLayout({ children }: any) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function DesktopLayout({ children }: any) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(isMobileUserAgent(navigator.userAgent));
    }
  }, []);

  return (
    <html lang="tr">
      <head>
        <title>Ekran Sitesi - Profesyonel Ekran Çözümleri</title>
        <meta name="description" content="Profesyonel ekran çözümleri, LED ekranlar, dijital tabelalar ve görsel sistemler için güvenilir hizmet. Kaliteli ürünler ve uzman destek." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ekransitesi.com" />
        <link rel="icon" href="/brands/zero_alt.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <PricesProvider>
          {isMobile ? (
            <MobileLayout>{children}</MobileLayout>
          ) : (
            <DesktopLayout>{children}</DesktopLayout>
          )}
          <WhatsAppButton />
          <CallButton />
        </PricesProvider>
      </body>
    </html>
  );
}