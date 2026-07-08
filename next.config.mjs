/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Netlify static export compatibility
  },
}

export default nextConfig
