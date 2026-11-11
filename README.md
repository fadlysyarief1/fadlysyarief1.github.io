# Website Korporat — PT Highland Urban Nusantara

Website profil perusahaan HUN dalam bentuk slide layar penuh (Beranda, Lini Usaha,
Visi & Misi, Perjalanan, Roadmap, Kontak). Dibuat dengan **Next.js** dan diekspor
menjadi HTML statis, jadi bisa diterbitkan gratis di **GitHub Pages** atau **Vercel**.

## Mengubah isi

Semua teks ada di **`data/situs.ts`** — statistik, lini usaha, visi, misi, nilai,
perjalanan, roadmap, dan kontak. Ubah di sana; tampilan ikut berubah.

- `draf: true` menampilkan label "Teks draf". Ubah ke `false` setelah disetujui.
- `TAMPIL_DRAF = false` menyembunyikan chip "Draf tampilan" di pojok kiri atas.
- Foto Direktur Utama: simpan sebagai `public/aset/direktur-utama.webp`, lalu isi
  `foto: 'direktur-utama'` pada `PIMPINAN`.
- Foto lain ada di `public/aset/` (format WebP).

Gaya tampilan ada di `app/globals.css`, komponen halaman di `components/Korporat.tsx`.

## Menjalankan di komputer

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev        # buka http://localhost:3000
npm run build      # hasil statis di folder out/
```

## Upload ke GitHub

```bash
git init
git add .
git commit -m "Website korporat HUN"
git branch -M main
git remote add origin https://github.com/<akun-anda>/<nama-repo>.git
git push -u origin main
```

Atau tanpa terminal: buat repo baru di github.com → **Add file → Upload files** →
seret semua isi folder ini (kecuali `node_modules`, `.next`, `out`) → **Commit**.

## Terbitkan

### Pilihan A — GitHub Pages (gratis, otomatis)
1. Di repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Setiap push ke `main`, workflow `.github/workflows/deploy-pages.yml` membangun dan
   menerbitkan situs ke `https://<akun>.github.io/<nama-repo>/`.
3. Pantau prosesnya di tab **Actions**.

Alamat sub-folder (`/<nama-repo>`) diatur otomatis. Bila memakai domain sendiri,
buat berkas `public/CNAME` berisi nama domain (mis. `corp.hunorganiccoffe.com`),
lalu arahkan DNS domain itu ke GitHub Pages.

### Pilihan B — Vercel
1. Masuk ke vercel.com → **Add New → Project** → pilih repo ini.
2. Biarkan pengaturan bawaan (framework Next.js terdeteksi otomatis) → **Deploy**.

### Pilihan C — hosting biasa / cPanel
Jalankan `npm run build`, lalu upload **isi** folder `out/` ke `public_html`
(atau folder subdomain).
