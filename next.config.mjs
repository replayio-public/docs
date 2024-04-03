import { withNextVideo } from "next-video/process";
import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/time-travel',
        destination: '/',
        permanent: true,
      },
    ]
  }
}

export default withNextVideo(
  withSearch(withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)),
  { folder: 'src/videos' }
);