/** @type {import('next').NextConfig} */
const isVercel = !!process.env.VERCEL;
const nextConfig = {
  // Nextjs has an issue with pdfjs-dist which optionally uses the canvas package
  // for Node.js compatibility. This causes a "Module parse failed" error when
  // building the app. Since pdfjs-dist is only used on client side, we disable
  // the canvas package for webpack
  // https://github.com/mozilla/pdf.js/issues/16214
  eslint: {
    // Don’t fail the build if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don’t fail the build if there are type errors in production
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    // Ensure pdf.js worker files are emitted and can be loaded via ?url imports
    config.module.rules.push({
      test: /pdf\.worker(\.min)?\.js$/,
      type: "asset/resource",
    });
    return config;
  },
};

// On Vercel, use the default `.next` directory (required by the platform).
// Locally (e.g., Windows + OneDrive), use a custom dir to avoid file lock issues.
if (!isVercel) {
  nextConfig.distDir = "build";
  nextConfig.output = "standalone";
}

module.exports = nextConfig;
