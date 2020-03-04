const execa = require('execa')

const getLoggedInNpmUsername = async () => {
  const {stdout} = await execa('npm', ['whoami'])
  return stdout
}

module.exports = {
  getLoggedInNpmUsername
}
