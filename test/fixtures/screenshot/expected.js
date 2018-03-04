const basepath = process.env.ARTIFACT_PATH || __dirname;
module.exports = () => {
  return [
   'ℹ️   Requesting http://localhost:5555/fixtures/screenshot',
   'ℹ️   Asset regex',
   'ℹ️    - /hash-(.+).js/g',
   'ℹ️    - /hash-(.+).css/g',
   '✅   Document loaded OK',
   '✅   200: http://localhost:5555/fixtures/screenshot/assets/hash-f78ghaw7.css',
   '✅   200: http://localhost:5555/fixtures/screenshot/assets/hash-h7sadwaj.js',
   '✅   Page loaded OK',
   'ℹ️   Setting viewport {"width":800,"height":300}',
   `✅   ${basepath}/desktop.png`,
   `✅   ${basepath}/fullpage.png`,
   'ℹ️   Setting viewport {"width":375,"height":667}',
   `✅   ${basepath}/narrow.png`,
   'ℹ️   Closing browser...',
   '✅   Everything OK!'
  ];
}