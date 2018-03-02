module.exports = () => {
  return [
   'ℹ️   Requesting http://localhost:5555/fixtures/mixed',
   'ℹ️   Asset regex /(main.js|style.css)$/g',
   '✅   Document loaded OK',
   '✅   200: http://localhost:5555/fixtures/mixed/assets/style.css',
   '❌   404: http://localhost:5555/fixtures/mixed/assets/main.js',
   '❌   Reason: net::ERR_ABORTED',
   '✅   Page loaded OK',
   'ℹ️   Closing browser...',
   '❌   Some assets failed to load...',
   '❌   	- http://localhost:5555/fixtures/mixed/assets/main.js'
  ];
}