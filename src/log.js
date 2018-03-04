//@flow
const colors = require('ansi-colors');

const PAD = 3

export default (caller/*: any */ = console.log) => ({
  success: (text/*: string */) => {
    caller(colors.bold(colors.green('✅'.padEnd(PAD))), colors.green(text))
  },
  warning: (text/*: string */) => {
    caller(colors.bold(colors.yellow('⚠️'.padEnd(PAD + 1))), colors.yellow(text))
  },
  error: (text/*: string */) => {
    caller(colors.bold(colors.red('❌'.padEnd(PAD))), colors.red(text))
  },
  info: (text/*: string */) => {
    // The little I guy doesnt account for enough space compared to the tick and cross!
    caller(colors.bold(colors.cyan('ℹ️'.padEnd(PAD + 1))), colors.cyan(text))
  },
})