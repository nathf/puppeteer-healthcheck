module.exports = () => {
  return [
   'ℹ️   Requesting http://localhost:5555/fixtures/mixed',
   'ℹ️   Asset regex',
   'ℹ️    - /main.js$/g',
   'ℹ️    - /style.css$/g',
   'ℹ️    - /nonexistant.css$/g',
   '✅   Document loaded OK',
   '✅   200: http://localhost:5555/fixtures/mixed/assets/style.css',
   '❌   404: http://localhost:5555/fixtures/mixed/assets/main.js',
   '❌   Reason: net::ERR_ABORTED',
   '✅   Page loaded OK',
   '❌   /nonexistant.css$/g didn\'t match any assets',
   'ℹ️   Closing browser...',
   '❌   Some assets failed to load...',
   '❌   	- http://localhost:5555/fixtures/mixed/assets/main.js'
  ];
}