const DEBUG_MODE_ON = false

const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const {string, shape} = require('prop-types')
const {Box, Text, Color} = require('ink')
const importJsx = require('import-jsx')

const Task = importJsx('../components/task.jsx')

const SetupProject = ({
  configuration
}) => {
  const [
    step,
    onSetStep
  ] = useState(0)

  const onNextStep = () => onSetStep(step + 1)

  useEffect(() => {
    if (Object.keys(configuration).length > 0) {
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration])

  // Step 1:
  // Clone boilerplate git repo

  const [
    isGitClonePending,
    onSetIsGitClonePending
  ] = useState(false)

  // TODO: Remove me
  const [
    areMockModulesResolved,
    setAreMockModulesResolved
  ] = useState(false)

  useEffect(() => {
    if (step === 1) {
      // Clone GitHub repo with boilerplate
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

      // TODO: Remove me
      setTimeout(() => {
        setAreMockModulesResolved(true)
      }, 10000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Step 2:
  // Delete existing `.git` folder
  // Start new git project
  // Optional: Add git remote

  const [
    isGitProjectPending,
    onSetIsGitProjectPending
  ] = useState(false)

  useEffect(() => {
    if (step === 2) {
      onSetIsGitProjectPending(true)
      shell.cd(configuration.packageName)
      // Delete old git folder
      shell.rm('-rf', '.git')
      // Start new git project with git init
      shell.exec('git init', {
        async: true,
        silent: true
      }, () => {
        // Finished git init
        if (configuration.gitRepoUrl.length > 0) {
          // Add git remote if URL was provided
          // TODO: Crop tailing `/` if present in `configuration.gitRepoUrl`
          shell.exec(`git remote add origin ${configuration.gitRepoUrl}.git`)
        }
        onSetIsGitProjectPending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Step 3:
  const [
    isLicensePending,
    onSetIsLicensePending
  ] = useState(false)

  useEffect(() => {
    if (step === 3) {
      onSetIsLicensePending(true)
      // Delete old LICENSE file
      shell.rm('-rf', 'LICENSE')
      // TODO: remove eslint-disable
      // eslint-disable-next-line sonarjs/no-all-duplicated-branches
      if (configuration.license === 'MIT') {
        // Create MIT license file
        // ...
        onSetIsLicensePending(false)
        onNextStep()
      }
      // TODO: remove eslint-disable
      // eslint-disable-next-line sonarjs/no-duplicated-branches
      else {
        onSetIsLicensePending(false)
        onNextStep()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Update `package.json`
  // Add readme file
  // Optional: Add license file
  // Optional: Add CoC file
  // Add change log file
  // Install packages (may take a few minutes)

  return (
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
          <Task
            isPending={isLicensePending}
            label='Creating license file'
          />
        )}
        {(step >= 4) && (
          <>
            <Task
              isPending={!areMockModulesResolved}
              label='Some more stuff'
            />
            {/* <Task
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
            /> */}
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
  )
}

SetupProject.propTypes = {
  configuration: shape({
    packageName: string,
    gitRepoUrl: string
  })
}

module.exports = SetupProject
