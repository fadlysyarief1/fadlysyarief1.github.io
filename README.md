# Website CV Zulfadhli Syarif (Next.js)

Next.js 14 (App Router) + TypeScript. Tanpa database, semua isi ada di `data/cv.ts`.

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:3000
```

## Build untuk hosting

```bash
npm run build
```

Hasilnya ada di folder `out/` (file statis). Upload seluruh isi `out/` ke `public_html` (cPanel), atau deploy folder proyek ke Vercel / Netlify.

Kalau ingin menjalankan sebagai server Node (`npm start`), hapus baris `output: "export"` di `next.config.mjs`.

## Struktur

```
app/layout.tsx          font (Poppins, JetBrains Mono), metadata SEO
app/page.tsx            semua bagian halaman
app/globals.css         seluruh style
components/AgentBuilder animasi 14 agen AI yang membangun halaman + toolbar
components/DotNav       navigasi titik vertikal di kanan
components/CopyButton   tombol salin email / nomor
data/cv.ts              ISI CV: profil, kontak, pengalaman, keahlian, proyek, sertifikat
public/photo.jpg        foto profil
```

## Pengaturan animasi

Di `components/AgentBuilder.tsx`:
- `BASE_SPEED` (default `0.5`): kecepatan dasar. Naikkan agar lebih cepat.
- `COLORS`: warna kursor agen (jumlahnya = jumlah agen).
- `SEL`: elemen mana saja yang "dibangun" oleh agen.
