/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "hriaadqagkkesinqiqop.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product_images/**",
      },
    ],
  },
};

export default nextConfig;
