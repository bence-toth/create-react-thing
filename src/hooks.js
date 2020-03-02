const {useState, useEffect} = require('react')
const {getLoggedInNpmUsername} = require('./utility')

const useNpmUsername = () => {
  // Initialize it with empty string
  const [npmUsername, onSetNpmUsername] = useState('')

  // See if a user is logged in
  useEffect(() => {
    (async () => {
      const username = await getLoggedInNpmUsername()
      if (username.length > 0) {
        onSetNpmUsername(username)
      }
    })()
  }, [])

  // Expose value
  return npmUsername
}

module.exports = {
  useNpmUsername
}
