const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }, // 使用 Chromium 浏览器
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }, // 使用 Firefox 浏览器
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' }, // 使用 WebKit 浏览器（类似 Safari）
    },
  ],
  use: {
    baseURL: 'http://localhost:3000', // 应用的基础 URL
    headless: true, // 是否以无头模式运行
  },
});