import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'IL DENTE PROIBITO',
  description: 'FUCK GUNS.LOL',
  openGraph: {
    type: 'website',
    url: 'https://ildenteproibito.pages.dev/',
    title: 'IL DENTE PROIBITO',
    description: 'FUCK GUNS.LOL',
    images: [
      {
        url: 'https://ildenteproibito.pages.dev/assets/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IL DENTE PROIBITO',
    description: 'FUCK GUNS.LOL',
    images: ['https://ildenteproibito.pages.dev/assets/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
