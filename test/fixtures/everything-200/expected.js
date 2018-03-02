module.exports = () => {
  return [
   'ℹ️   Requesting http://localhost:5555/fixtures/everything-200',
   'ℹ️   Asset regex /(main.js|style.css)$/g',
   '✅   Document loaded OK',
   '✅   200: http://localhost:5555/fixtures/everything-200/assets/style.css',
   '✅   200: http://localhost:5555/fixtures/everything-200/assets/main.js',
   '✅   Page loaded OK',
   'ℹ️   Closing browser...',
   '✅   Everything OK!'
  ];
}