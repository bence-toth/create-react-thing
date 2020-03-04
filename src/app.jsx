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
    step,
    onSetStep
  ] = useState(1)

  const onNextStep = () => onSetStep(step + 1)

  const [
    isGitClonePending,
    onSetIsGitClonePending
  ] = useState(false)

  const [
    areMockModulesResolved,
    setAreMockModulesResolved
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
        onNextStep()
      })

      setTimeout(() => {
        setAreMockModulesResolved(true)
      }, 10000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration])

  const [
    isGitProjectPending,
    onSetIsGitProjectPending
  ] = useState(false)

  useEffect(() => {
    if (step === 2) {
      onSetIsGitProjectPending(true)
      shell.cd(configuration.packageName)
      shell.rm('-rf', '.git')
      shell.exec('git init', {
        async: true,
        silent: true
      }, () => {
        // Finished git init
        if (configuration.gitRepoUrl.length > 0) {
          shell.exec(`git remote add origin ${configuration.gitRepoUrl}.git`)
        }
        onSetIsGitProjectPending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

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
            {(step >= 1) && (
              <Task
                isPending={isGitClonePending}
                label='Copying files'
              />
            )}
            {(step >= 2) && (
              <Task
                isPending={isGitProjectPending}
                label='Starting new git project'
              />
            )}
            {(step >= 3) && (
              <>
                <Task
                  isPending={!areMockModulesResolved}
                  label='Creating README.md'
                />
                <Task
                  isPending={!areMockModulesResolved}
                  label='Creating LICENSE.md'
                />
                <Task
                  isPending={!areMockModulesResolved}
                  label='Creating CODE_OF_CONDUCT.md'
                />
                <Task
                  isPending={!areMockModulesResolved}
                  label='Updating package.json'
                />
                <Task
                  isPending={!areMockModulesResolved}
                  label='Installing packages'
                />
              </>
            )}
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
