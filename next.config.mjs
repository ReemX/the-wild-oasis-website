/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ctuzggtnfhkcrixendab.supabase.co",
      },
    ],
  },
};

export default nextConfig;
