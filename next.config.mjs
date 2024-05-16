/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.themoviedb.org",
      "media.themoviedb.org",
    //   {
    //     domain: "api.themoviedb.org",
    //     authorization: {
    //       type: "Bearer",
    //       token: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
    //     },
    //   },
    ],
  },
};

export default nextConfig;
