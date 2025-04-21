/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Wichtig für Docker-Build!
};

module.exports = nextConfig;
