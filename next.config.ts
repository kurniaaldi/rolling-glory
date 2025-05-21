import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
        locale: false,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
