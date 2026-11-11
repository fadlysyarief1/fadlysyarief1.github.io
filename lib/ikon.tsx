import type { CSSProperties } from 'react';

// Ikon garis 24×24 (stroke = currentColor). Dipakai di seluruh halaman.
const PATH = {
  kalender: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16M8.5 3v4M15.5 3v4" /></>,
  daun: <><path d="M12 21c-4.5-2-7-5.5-7-10a7 7 0 0 1 14 0c0 4.5-2.5 8-7 10Z" /><path d="M12 21V9M12 13l-3-2.5M12 11.5l3-2.5" /></>,
  truk: <><path d="M3 7h12v10H3zM15 10h4l2 3v4h-6" /><circle cx="7" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></>,
  gunung: <><path d="M3 20 9.5 8l4 6.5L16 11l5 9Z" /><path d="M8 11.5 9.5 8l1.6 2.6" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17M12 3.5a13 13 0 0 0 0 17" /></>,
  tas: <><path d="M5 8h14l-1.2 11.3a1.8 1.8 0 0 1-1.8 1.7H8a1.8 1.8 0 0 1-1.8-1.7L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  orang: <><circle cx="8.5" cy="8.5" r="3" /><circle cx="16.5" cy="9.5" r="2.5" /><path d="M3 19.5a5.5 5.5 0 0 1 11 0M14.5 19.5a4.5 4.5 0 0 1 7 0" /></>,
  lampu: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></>,
  hati: <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />,
  daftar: <><path d="M4 7h16M4 12h10M4 17h7" /><circle cx="18" cy="16" r="3" /></>,
  laptop: <><rect x="4.5" y="5" width="15" height="10.5" rx="1.5" /><path d="M2.5 19h19" /></>,
  gedung: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />,
  perisai: <><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></>,
  cangkir: <><path d="M5 9h11v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" /><path d="M16 10.5h3" /></>,
  tunas: <path d="M4 20c6 0 10-4 12-12M12 8c3 0 6 1 8 4" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  surat: <><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></>,
  wa: <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />,
  panahLuar: <path d="M7 17 17 7M8 7h9v9" />,
  rumah: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />,
  usaha: <><rect x="4" y="3" width="10" height="18" rx="1.5" /><path d="M14 9h5a1 1 0 0 1 1 1v11h-6M7.5 7h3M7.5 11h3M7.5 15h3" /></>,
  perjalanan: <><path d="M5 9h11v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 4.5c0 1 1 1 1 2M11.5 4.5c0 1 1 1 1 2" /><path d="M4 20h13" /></>,
  telepon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  kiri: <path d="m15 6-6 6 6 6" />,
  kanan: <path d="m9 6 6 6-6 6" />,
  bawah: <path d="m6 9 6 6 6-6" />,
} as const;

export type NamaIkon = keyof typeof PATH;

export function Ikon({ nama }: { nama: NamaIkon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{PATH[nama]}</svg>;
}

const WARNA: Record<string, [string, string]> = {
  hijau: ['#6f9a52', '#2c3d23'], kopi: ['#d48a44', '#7a4d2a'], cokelat: ['#8f5d33', '#3b2412'],
  emas: ['#d8a85e', '#8f6630'], biru: ['#5f87a8', '#2b4256'], mawar: ['#c97a8a', '#6a3442'], wa: ['#4fae6a', '#1f6b38'],
};

/** Gaya CSS variabel untuk kotak ikon bergradasi. */
export const gayaWarna = (w: string) => {
  const [c1, c2] = WARNA[w] ?? WARNA.hijau;
  return { ['--c1' as string]: c1, ['--c2' as string]: c2 } as CSSProperties;
};

export function KotakIkon({ nama, warna, kelas = '' }: { nama: NamaIkon; warna: string; kelas?: string }) {
  return <span className={`ikon-kotak ${kelas}`} style={gayaWarna(warna)}><Ikon nama={nama} /></span>;
}
