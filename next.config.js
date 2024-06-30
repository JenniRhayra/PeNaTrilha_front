/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    images: {
        domains: ['ibb.co', 'i.ibb.co'],
    },
};

module.exports = nextConfig;
