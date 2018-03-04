const basepath = process.env.ARTIFACT_PATH || __dirname;
module.exports = {
  assetRegex: [
    'hash-(.+)\.js',
    'hash-(.+)\.css',
  ],
  screenshots: [
    {
      path: `${basepath}/desktop.png`,
      viewport: {
        width: 800,
        height: 300
      }
    },
    {
      path: `${basepath}/fullpage.png`,
      fullPage: true
    },
    {
      path: `${basepath}/narrow.png`,
      viewport: {
        width: 375,
        height: 667
      }
    }
  ]

}