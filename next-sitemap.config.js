/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.roundedapps.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/dashboard/*", "/app", "/app/*"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/accessbox": 0.9,
      "/support": 0.6,
      "/privacy": 0.3,
      "/terms": 0.3,
      "/story": 0.5,
      "/learn/pwned-passwords": 0.6,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
