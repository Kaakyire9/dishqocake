/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dishqocake.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.9,
  exclude: ["/404", "/order-success"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.dishqocake.com/sitemap.xml",
    ],
  },
};
