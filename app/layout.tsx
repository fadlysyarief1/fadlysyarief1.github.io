import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  // Ganti dengan alamat situs Anda (dipakai untuk gambar pratinjau saat link dibagikan).
  metadataBase: new URL(process.env.SITE_URL ?? 'https://hunorganiccoffe.com'),
  title: 'PT Highland Urban Nusantara — Dari Kebun Gayo ke Pasar Dunia',
  description: 'PT Highland Urban Nusantara (HUN): produsen dan eksportir kopi arabika Gayo dari Takengon, Aceh Tengah — kebun, pengolahan, ekspor green bean, retail, dan kemitraan.',
  icons: { icon: `${base}/aset/logo.webp` },
  openGraph: {
    title: 'PT Highland Urban Nusantara',
    description: 'Produsen dan eksportir kopi arabika Gayo dari Takengon, Aceh Tengah.',
    images: [`${base}/aset/hero.webp`],
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0e170c',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
