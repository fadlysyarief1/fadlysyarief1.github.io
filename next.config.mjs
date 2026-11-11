/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ubah ke output: "export" bila ingin di-host sebagai file statis (cPanel / shared hosting).
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
