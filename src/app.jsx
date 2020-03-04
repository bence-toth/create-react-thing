/* eslint-disable react/jsx-props-no-spreading */
const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')
const importJsx = require('import-jsx')

const CollectInfo = importJsx('./collectInfo/collectInfo.jsx')

const App = ({
  packageName
}) => {
  const [configuration, onSetConfiguration] = useState({})

  const [
    isGitClonePending,
    onSetIsGitClonePending
  ] = useState(false)

  useEffect(() => {
    if (Object.keys(configuration).length > 0) {
      // Starting git clone
      onSetIsGitClonePending(true)
      shell.exec([
        'git clone',
        'https://github.com/bence-toth/react-library-boilerplate.git',
        packageName
      ].join(' '), {
        async: true,
        silent: true
      }, () => {
        // Finished git clone
        onSetIsGitClonePending(false)
        shell.cd(packageName)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration])

  return (
    <Box
      flexDirection='column'
    >
      {(Object.keys(configuration).length === 0) && (
        <CollectInfo
          packageName={packageName}
          onSaveConfiguration={onSetConfiguration}
        />
      )}
      {(Object.keys(configuration).length > 0) && (
        <>
          <Box
            paddingTop={1}
            flexDirection='column'
          >
            <Text>
              {(
                isGitClonePending
                  ? 'Copying files...'
                  : 'Copying files complete'
              )}
            </Text>
          </Box>
          <Box
            paddingTop={2}
            flexDirection='column'
          >
            <Text>
              <Color blueBright>
                {'DEBUG: '}
                {JSON.stringify(configuration)}
              </Color>
            </Text>
          </Box>
        </>
      )}
    </Box>
  )
}

App.propTypes = {
  packageName: string
  // TODO: flags: object
}

App.defaultProps = {
  // TODO: flags: {}
}

module.exports = App
