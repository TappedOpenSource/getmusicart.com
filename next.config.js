/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost', 
            }, 
            {
                protocol: 'https',
                hostname: 'static.tryleap.ai', 
            },
        ],
    }
}

module.exports = nextConfig
