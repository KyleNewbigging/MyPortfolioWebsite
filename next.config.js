const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/MyPortfolioWebsite",
        assetPrefix: "/MyPortfolioWebsite/",
      }
    : {}),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/MyPortfolioWebsite" : "",
  },
};

module.exports = nextConfig
