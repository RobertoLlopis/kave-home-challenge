import type { NextConfig } from 'next'

const mediaHost = process.env.KAVE_HOME_MEDIA_HOST
if (!mediaHost)
  throw new Error('Missing required environment variable: KAVE_HOME_MEDIA_HOST')
if (!/^[a-z0-9.-]+$/i.test(mediaHost))
  throw new Error('KAVE_HOME_MEDIA_HOST must be a valid host')

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: mediaHost }],
  },
}

export default nextConfig
