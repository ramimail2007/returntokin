import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ReturnToKin — Every missing person deserves a way back.',
  description: 'ReturnToKin connects families, communities and trusted organizations to help turn scattered information into meaningful leads.',
  openGraph: {
    title: 'ReturnToKin — Every missing person deserves a way back.',
    description: 'A trusted global network connecting missing-person reports, sightings and institutional information to help families find answers.',
    type: 'website',
    url: 'https://returntokin.org',
    siteName: 'ReturnToKin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReturnToKin — Every missing person deserves a way back.',
    description: 'A trusted global network connecting missing-person reports, sightings and institutional information.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'ReturnToKin' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <Header />
        <main className="pt-[72px] md:pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}