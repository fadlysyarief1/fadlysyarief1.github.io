// Alamat berkas di public/ dengan memperhitungkan BASE_PATH (GitHub Pages).
export const aset = (nama: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/aset/${nama}.webp`;
