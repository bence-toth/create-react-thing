const {useState, useEffect} = require('react');
const execa = require('execa');

const onGetLoggedInNpmUsername = async () => {
	const {stdout} = await execa('npm', ['whoami']);
	return stdout;
};

const useNpmUsername = () => {
  // Initialize it with empty string
	[npmUsername, onSetNpmUsername] = useState('');

  // See if a user is logged in
  useEffect(() => {
		onGetLoggedInNpmUsername()
			.then(username => {
				if (username.length > 0) {
					onSetNpmUsername(username);
				}
			});
  }, []);

  // Expose value and setter
  return [npmUsername, onSetNpmUsername];
}

module.exports = {
  useNpmUsername
};
