module.exports = {
  uri: 'https://github.com/login',
  assetRegex: [
    'github-(.+)\.js',
    'github-(.+)\.css',
  ],
  screenshots: [
    {
      path: `${__dirname}/desktop.png`,
      viewport: {
        width: 800,
        height: 300
      }
    },
    {
      path: `${__dirname}/fullpage.png`,
      fullPage: true
    },
    {
      path: `${__dirname}/narrow.png`,
      viewport: {
        width: 375,
        height: 667
      }
    }
  ]
}