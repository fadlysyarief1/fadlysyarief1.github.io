/** @type {import('next').NextConfig} */

// BASE_PATH dipakai bila situs dibuka dari sub-folder, mis. GitHub Pages
// https://<akun>.github.io/<nama-repo>  →  BASE_PATH=/<nama-repo>
// Untuk Vercel / domain sendiri biarkan kosong.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',          // hasil build = HTML statis di folder out/
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
