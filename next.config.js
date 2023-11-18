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
            {
                protocol: 'https',
                hostname: 'getmusicart-com.vercel.app', 
            },
            {
                protocol: 'https',
                hostname: 'www.getmusicart.com', 
            },
            {
                protocol: 'https',
                hostname: 'coverart.tapped.ai', 
            },
        ],
    }
}

module.exports = nextConfig
