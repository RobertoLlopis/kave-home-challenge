import type { NextConfig } from 'next'
import { environment } from './src/config/environment/runtime'

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: environment.mediaHost }],
  },
}

export default nextConfig
