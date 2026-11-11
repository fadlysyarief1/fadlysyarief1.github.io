/* =========================================================================
   ISI WEBSITE KORPORAT PT HIGHLAND URBAN NUSANTARA
   Semua teks ada di berkas ini. Ubah di sini, tampilan ikut berubah.
   - draf: true  → menampilkan label "Teks draf" di halaman. Ubah ke false
     setelah teksnya disetujui manajemen.
   - TAMPIL_DRAF → chip "Draf tampilan" di pojok kiri atas.
   ========================================================================= */
import type { NamaIkon } from '@/lib/ikon';

export const TAMPIL_DRAF = true;

export type Warna = 'hijau' | 'kopi' | 'cokelat' | 'emas' | 'biru' | 'mawar' | 'wa';
export type Chip = { teks: string; gaya?: 'emas' | 'hijau' };

export const KONTAK = {
  perusahaan: 'PT Highland Urban Nusantara',
  alamat: ['Takengon, Aceh Tengah', 'Aceh 24519, Indonesia'],
  email: 'export@hunorganiccoffe.com',
  wa: '6285147932117',
  waTampil: '+62 851-4793-2117',
  toko: 'https://hunorganiccoffe.com/',
};

export const MAIL_SAMPEL = `mailto:${KONTAK.email}?subject=${encodeURIComponent('Permintaan sampel green bean Gayo')}`;

export const STATISTIK: Array<{ ikon: NamaIkon; angka?: number; awalan?: string; akhiran?: string; teks?: string; label: string; tahun?: boolean }> = [
  { ikon: 'kalender', angka: 2024, label: 'Tahun berdiri', tahun: true },
  { ikon: 'daun', angka: 8, akhiran: ' ha', label: 'Kebun milik sendiri' },
  { ikon: 'truk', angka: 10, awalan: '±', akhiran: ' ton', label: 'Kapasitas pasok per bulan' },
  { ikon: 'gunung', teks: '1.200–1.700', label: 'mdpl ketinggian kebun' },
];

export type Unit = { foto: string; alt: string; judul: string; teks: string; chip: Chip[]; logo?: boolean };
export type Lini = {
  id: string; tab: string; judul: string; sub: string; ikon: NamaIkon; warna: Warna; teks: string;
  chip: Chip[]; tombol?: { label: string; url: string; ikon: NamaIkon; baru?: boolean }; unit: Unit[];
};

export const LINI: Lini[] = [
  {
    id: 'kebun', tab: 'Kebun & Pengolahan', judul: 'Kebun & Pengolahan', sub: 'Hulu rantai pasok HUN', ikon: 'daun', warna: 'hijau',
    teks: 'Kopi HUN berasal dari kebun milik perusahaan dan kebun mitra di Aceh Tengah dan Bener Meriah. Ceri dipetik, dipilah, dan diolah di fasilitas pengolahan kami sendiri, sehingga mutu setiap lot terjaga dari pohon sampai karung.',
    chip: [{ teks: 'Aceh Tengah & Bener Meriah', gaya: 'hijau' }, { teks: '1.200–1.700 mdpl' }],
    unit: [
      { foto: 'kebun', alt: 'Ceri kopi arabika Gayo matang di pohon', judul: 'Kebun milik perusahaan', teks: 'Lahan kebun seluas 8 hektar milik PT Highland Urban Nusantara. Hasil panennya diolah dan dijual langsung oleh HUN.', chip: [{ teks: '8 hektar', gaya: 'emas' }, { teks: 'Arabika Gayo' }] },
      { foto: 'panen', alt: 'Karung ceri kopi hasil panen di kebun', judul: 'Kebun mitra petani', teks: 'Kerja sama pengelolaan kebun dengan petani pemilik lahan melalui skema bagi hasil — petani tetap pemilik, HUN mengelola budidaya, pengolahan, dan pemasaran.', chip: [{ teks: 'Bagi hasil' }, { teks: 'Pengelolaan bersama' }] },
      { foto: 'olah', alt: 'Rumah pengering kopi di fasilitas pengolahan HUN', judul: 'Pengolahan pascapanen', teks: 'Rumah pengering dan lantai jemur sendiri untuk empat metode proses: Full Washed, Wet Hulled (giling basah), Natural, dan Honey.', chip: [{ teks: 'Full Washed' }, { teks: 'Wet Hulled' }, { teks: 'Natural' }, { teks: 'Honey' }] },
    ],
  },
  {
    id: 'ekspor', tab: 'Ekspor Green Bean', judul: 'Ekspor Green Bean', sub: 'Untuk roaster & importir', ikon: 'globe', warna: 'kopi',
    teks: 'Green bean arabika Gayo untuk roaster dan importir di luar negeri — dari 300 kg sampai kontainer penuh, FOB Belawan. Sampel dan spesifikasi lot tersedia atas permintaan.',
    chip: [],
    tombol: { label: 'Minta sampel & penawaran', url: MAIL_SAMPEL, ikon: 'surat' },
    unit: [
      { foto: 'fw', alt: 'Green bean arabika Gayo full washed', judul: 'Lot Full Washed, Wet Hulled & Honey', teks: 'Lot terpisah per metode proses, dengan informasi asal kebun, ketinggian, dan proses untuk setiap pengiriman.', chip: [{ teks: 'FOB Belawan', gaya: 'emas' }, { teks: 'Mulai 300 kg' }, { teks: 'Hingga kontainer penuh' }] },
      { foto: 'wh', alt: 'Green bean arabika Gayo wet hulled', judul: 'Kapasitas pasok', teks: 'Sekitar 10 ton per bulan dari kebun sendiri dan kebun mitra — cukup untuk kontrak rutin roaster dan importir.', chip: [{ teks: '±10 ton / bulan', gaya: 'emas' }] },
      { foto: 'memilah', alt: 'Memilah ceri kopi Gayo', judul: 'Sertifikasi organik', teks: 'HUN sedang menempuh proses sertifikasi organik melalui CCOF (California Certified Organic Farmers, standar USDA NOP). Status akan diperbarui setelah sertifikat terbit.', chip: [{ teks: 'Dalam proses', gaya: 'hijau' }, { teks: 'CCOF · USDA NOP' }] },
    ],
  },
  {
    id: 'retail', tab: 'Retail Online', judul: 'Retail Online', sub: 'hunorganiccoffe.com', ikon: 'tas', warna: 'cokelat',
    teks: 'Toko online HUN untuk rumah, kantor, dan kedai: green bean, roasted bean, dan kopi bubuk arabika Gayo. Bayar dengan transfer atau QRIS, dikirim ke seluruh Indonesia.',
    chip: [],
    tombol: { label: 'Kunjungi toko online', url: KONTAK.toko, ikon: 'panahLuar', baru: true },
    unit: [
      { foto: 'produk', alt: 'Kemasan kopi arabika Gayo HUN', judul: 'Roasted bean & bubuk', teks: 'Kopi sangrai dan bubuk dari biji Gayo pilihan, dengan pilihan proses dan tingkat sangrai untuk seduh manual maupun espresso.', chip: [{ teks: 'Roasted bean' }, { teks: 'Bubuk' }] },
      { foto: 'tangan', alt: 'Ceri kopi Gayo di tangan petani', judul: 'Green bean eceran', teks: 'Green bean ukuran rumahan untuk home roaster dan kedai kecil yang menyangrai sendiri.', chip: [{ teks: 'Home roaster' }, { teks: 'Kedai' }] },
      { foto: 'logofull', alt: 'Logo HUN', logo: true, judul: 'Akun member', teks: 'Riwayat pesanan, voucher, dan pelacakan pengiriman dalam satu akun member di toko online.', chip: [{ teks: 'Transfer' }, { teks: 'QRIS' }, { teks: 'Seluruh Indonesia' }] },
    ],
  },
  {
    id: 'mitra', tab: 'Kemitraan', judul: 'Kemitraan', sub: 'Kedai, reseller & UMKM', ikon: 'orang', warna: 'emas',
    teks: 'Program kemitraan untuk kedai kopi, kantor, dan reseller — juga UMKM yang ingin memasarkan produknya bersama HUN melalui toko online kami.',
    chip: [],
    tombol: { label: 'Diskusikan kemitraan', url: `https://wa.me/${KONTAK.wa}?text=${encodeURIComponent('Halo HUN, saya tertarik program kemitraan.')}`, ikon: 'wa', baru: true },
    unit: [
      { foto: 'produk', alt: 'Produk kopi HUN', judul: 'Kedai & kantor', teks: 'Pasokan rutin biji kopi untuk kedai dan kantor dengan harga mitra dan jadwal kirim yang bisa disepakati.', chip: [{ teks: 'Harga mitra' }, { teks: 'Pasokan rutin' }] },
      { foto: 'panen', alt: 'Hasil panen kopi Gayo', judul: 'Reseller', teks: 'Jual kembali produk HUN dengan harga reseller dan materi pemasaran dari kami.', chip: [{ teks: 'Harga reseller' }] },
      { foto: 'memilah', alt: 'Proses pemilahan kopi', judul: 'UMKM mitra', teks: 'UMKM dapat menjual produknya berdampingan dengan kopi HUN di toko online — HUN membantu etalase dan penjualan.', chip: [{ teks: 'Etalase bersama', gaya: 'hijau' }] },
    ],
  },
];

export const VISI = {
  draf: true,
  sorot: 'kopi arabika Gayo',
  sebelum: 'Menjadi produsen dan eksportir ',
  sesudah: ' yang dipercaya pasar dunia — dengan mutu yang dapat ditelusuri dari kebun sampai cangkir.',
  catatan: 'Bukan sekadar menjual biji kopi, tetapi membangun rantai pasok yang adil bagi petani dan bernilai bagi pembeli.',
};

export const MISI: Array<{ ikon: NamaIkon; warna: Warna; judul: string; teks: string }> = [
  { ikon: 'daun', warna: 'hijau', judul: 'Mutu dari hulu', teks: 'Menjaga mutu sejak budidaya, petik merah, sortasi, hingga pengolahan dan penyimpanan.' },
  { ikon: 'daftar', warna: 'kopi', judul: 'Ketertelusuran', teks: 'Setiap lot tercatat asal kebun, ketinggian, dan metode prosesnya.' },
  { ikon: 'orang', warna: 'emas', judul: 'Kemitraan yang adil', teks: 'Bertumbuh bersama petani pemilik lahan melalui skema bagi hasil yang jelas.' },
  { ikon: 'globe', warna: 'biru', judul: 'Pasar global', teks: 'Membawa kopi Gayo ke roaster dan importir mancanegara melalui ekspor langsung.' },
  { ikon: 'laptop', warna: 'cokelat', judul: 'Digital & UMKM', teks: 'Memperluas akses pasar lewat toko online, program reseller, dan etalase UMKM.' },
];

export const NILAI: Array<{ huruf: string; warna: Warna; judul: string; teks: string }> = [
  { huruf: 'K', warna: 'biru', judul: 'Kualitas di setiap tahap', teks: 'Tidak ada tahap yang dianggap kecil — dari memetik ceri sampai mengemas karung.' },
  { huruf: 'O', warna: 'hijau', judul: 'Orientasi berkelanjutan', teks: 'Menjaga kebun, tanah, dan hubungan dagang untuk jangka panjang, bukan untung sesaat.' },
  { huruf: 'P', warna: 'emas', judul: 'Petani sebagai mitra', teks: 'Petani adalah rekan usaha. Keberhasilan HUN adalah keberhasilan mereka juga.' },
  { huruf: 'I', warna: 'kopi', judul: 'Integritas & transparansi', teks: 'Jujur soal mutu, asal-usul, dan status sertifikasi kepada setiap pembeli.' },
];

export const KUTIPAN: { draf: boolean; teks: string; oleh: string } | null = {
  draf: true,
  teks: 'Kopi Gayo layak dikenal dunia lewat mutunya, bukan sekadar namanya. Tugas kami memastikan setiap karung yang keluar dari Takengon membawa cerita kebun yang jujur.',
  oleh: 'Zulfadhli Syarif, S.Kom · Direktur Utama',
};

export const PERJALANAN: Array<{ label: string; ikon: NamaIkon; warna: Warna; judul: string; teks: string; berjalan?: boolean }> = [
  { label: '2024', ikon: 'gedung', warna: 'emas', judul: 'PT Highland Urban Nusantara berdiri', teks: 'Perusahaan didirikan di Takengon, Aceh Tengah, untuk mengelola kopi arabika Gayo dari kebun sampai penjualan.' },
  { label: 'Hulu', ikon: 'daun', warna: 'hijau', judul: 'Kebun sendiri & kebun mitra', teks: 'Mengelola kebun milik perusahaan seluas 8 hektar dan menjalin kerja sama pengelolaan kebun dengan petani melalui skema bagi hasil.' },
  { label: 'Digital', ikon: 'tas', warna: 'cokelat', judul: 'Toko online hunorganiccoffe.com', teks: 'Penjualan langsung ke konsumen, kedai, dan reseller di seluruh Indonesia, lengkap dengan akun member dan program mitra.' },
  { label: '2026', ikon: 'perisai', warna: 'hijau', judul: 'Sertifikasi organik CCOF', teks: 'Menyiapkan dan mengajukan sertifikasi organik melalui CCOF (standar USDA NOP).', berjalan: true },
  { label: 'Kini', ikon: 'globe', warna: 'biru', judul: 'Membuka pasar ekspor', teks: 'Menawarkan green bean Full Washed grade 1 kepada roaster dan importir internasional.', berjalan: true },
];

type ItemFase = { ikon: NamaIkon; warna: Warna; judul: string; teks: string };
export const ROADMAP: { draf: boolean; fase: Array<{ no: string; judul: string; sub: string; item: ItemFase[] }> } = {
  draf: true,
  fase: [
    { no: '01', judul: 'Mutu & Sertifikasi', sub: 'Fondasi', item: [
      { ikon: 'perisai', warna: 'hijau', judul: 'Sertifikasi organik', teks: 'Menuntaskan proses sertifikasi CCOF.' },
      { ikon: 'daftar', warna: 'kopi', judul: 'Ketertelusuran lot', teks: 'Pencatatan asal kebun dan proses untuk setiap lot.' },
      { ikon: 'cangkir', warna: 'emas', judul: 'Standar sortasi & cupping', teks: 'Standar mutu tertulis untuk setiap grade.' },
      { ikon: 'gedung', warna: 'cokelat', judul: 'Fasilitas pengolahan', teks: 'Kapasitas pengeringan dan gudang yang memadai.' },
    ] },
    { no: '02', judul: 'Ekspor & Kapasitas', sub: 'Ekspansi', item: [
      { ikon: 'globe', warna: 'biru', judul: 'Pembeli ekspor rutin', teks: 'Kontrak berulang dengan roaster dan importir.' },
      { ikon: 'daun', warna: 'hijau', judul: 'Perluasan kebun mitra', teks: 'Menambah petani mitra dengan skema bagi hasil.' },
      { ikon: 'truk', warna: 'kopi', judul: 'Logistik ekspor', teks: 'Alur pengiriman FOB yang efisien dan terdokumentasi.' },
      { ikon: 'orang', warna: 'emas', judul: 'Tim & SDM', teks: 'Penguatan tim mutu, operasional, dan perdagangan.' },
    ] },
    { no: '03', judul: 'Merek & Ekosistem', sub: 'Dampak', item: [
      { ikon: 'tas', warna: 'cokelat', judul: 'Merek HUN di dalam negeri', teks: 'Kopi HUN hadir di lebih banyak kedai dan rumah.' },
      { ikon: 'orang', warna: 'emas', judul: 'Jaringan reseller & UMKM', teks: 'Ekosistem mitra yang tumbuh bersama HUN.' },
      { ikon: 'tunas', warna: 'hijau', judul: 'Kesejahteraan petani', teks: 'Program pendampingan budidaya untuk petani mitra.' },
      { ikon: 'laptop', warna: 'biru', judul: 'Digitalisasi rantai pasok', teks: 'Data kebun, lot, dan pesanan terhubung dalam satu sistem.' },
    ] },
  ],
};

export const PIMPINAN = {
  nama: 'Zulfadhli Syarif, S.Kom',
  inisial: 'ZS',
  foto: null as string | null, // mis. 'direktur-utama' → public/aset/direktur-utama.webp
  jabatan: 'Founder & Direktur Utama',
  teks: 'Memimpin PT Highland Urban Nusantara membangun rantai pasok kopi arabika Gayo yang utuh — dari kebun dan pengolahan hingga pasar domestik dan ekspor.',
};
