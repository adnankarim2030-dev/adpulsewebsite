/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/mission', destination: '/about', permanent: true },
      { source: '/clients-old', destination: '/portfolio', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/print-media', destination: '/services', permanent: true },
      { source: '/events', destination: '/services', permanent: true },
      { source: '/production', destination: '/services/tvc-production', permanent: true },
      { source: '/media-buying', destination: '/services/media-buying', permanent: true },
      { source: '/latest-work', destination: '/portfolio', permanent: true },
      { source: '/ooh', destination: '/services/outdoor-media', permanent: true },
      { source: '/vision', destination: '/about', permanent: true },
      // Adding common fallbacks for the other 4 unlisted links out of 14
      { source: '/services-old', destination: '/services', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true }
    ];
  },
};

export default nextConfig;
