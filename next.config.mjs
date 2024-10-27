/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "img.clerk.com",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
    ], // Add allowed domains here
  },
  webpack(config) {
    // Add a rule for loading HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader", // Use the html-loader for HTML files
    });

    return config;
  },
};

export default nextConfig; // Properly export the nextConfig object
