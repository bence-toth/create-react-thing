const DEBUG_MODE_ON = false

/* eslint-disable react/jsx-props-no-spreading */
const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')
const importJsx = require('import-jsx')

const CollectInfo = importJsx('./collectInfo/collectInfo.jsx')
const Task = importJsx('./components/task.jsx')

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
        configuration.packageName
      ].join(' '), {
        async: true,
        silent: true
      }, () => {
        // Finished git clone
        onSetIsGitClonePending(false)
        shell.cd(configuration.packageName)
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
            flexDirection='column'
            paddingY={1}
            paddingX={2}
          >
            <Task
              isPending={isGitClonePending}
              label='Copying files'
            />
            <Task
              isPending
              label='Updating package.json'
            />
            <Task
              isPending
              label='Creating README.md'
            />
            <Task
              isPending
              label='Creating LICENSE.md'
            />
            <Task
              isPending
              label='Creating CODE_OF_CONDUCT.md'
            />
            <Task
              isPending
              label='Starting new git project'
            />
            <Task
              isPending
              label='Installing packages'
            />
          </Box>
          {DEBUG_MODE_ON && (
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
          )}
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
