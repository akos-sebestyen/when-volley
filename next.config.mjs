/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/teams",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
