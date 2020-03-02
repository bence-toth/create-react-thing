const {useState, useEffect} = require('react');
const {getLoggedInNpmUsername} = require('./utility');

const useNpmUsername = () => {
  // Initialize it with empty string
	[npmUsername, onSetNpmUsername] = useState('');

  // See if a user is logged in
  useEffect(() => {
		getLoggedInNpmUsername()
			.then(username => {
				if (username.length > 0) {
					onSetNpmUsername(username);
				}
			});
  }, []);

  // Expose value
  return npmUsername;
}

module.exports = {
  useNpmUsername
};
