//@flow
const colors = require('ansi-colors');

const PAD = 3

export default {
  success: (text/*: string */) => {
    console.log(colors.bold(colors.green('✅'.padEnd(PAD))), colors.green(text))
  },
  error: (text/*: string */) => {
    console.log(colors.bold(colors.red('❌'.padEnd(PAD))), colors.red(text))
  },
  info: (text/*: string */) => {
    // The little I guy doesnt account for enough space compared to the tick and cross!
    console.log(colors.bold(colors.cyan('ℹ️'.padEnd(PAD + 1))), colors.cyan(text))
  },
}