const shell = require('shelljs')

const onPrecheck = () => {
  if (!shell.which('git')) {
    shell.echo('Please install git before running this application')
    shell.exit(1)
  }
}

module.exports = onPrecheck
