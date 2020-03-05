const DEBUG_MODE_ON = false

const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const {string, shape} = require('prop-types')
const {Box, Text, Color} = require('ink')
const importJsx = require('import-jsx')
const handlebars = require('handlebars')

const Task = importJsx('../components/task.jsx')
const {licenses, codeOfConducts} = require('../enum')

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
  // Optional: Add license
  const [
    isLicensePending,
    onSetIsLicensePending
  ] = useState(false)

  useEffect(() => {
    if (step === 3) {
      onSetIsLicensePending(true)
      // Delete old LICENSE file
      shell.rm('-rf', 'LICENSE')
      if (configuration.license === licenses.mit) {
        // Create MIT license file
        const templateCode = shell
          .cat(`${__dirname}/templates/licenses/mit.hbr`)
          .toString()
        const template = handlebars.compile(templateCode)
        const licenseContent = template({
          year: `${new Date().getFullYear()}`,
          copyrightOwner: configuration.authorName
        })
        const licensePath = './LICENSE'
        shell.ShellString(licenseContent).to(licensePath)
        onSetIsLicensePending(false)
        onNextStep()
      }
      else {
        onSetIsLicensePending(false)
        onNextStep()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Step 4:
  // Optional: Add Code of Conduct
  const [
    isCodeOfConductPending,
    onSetIsCodeOfConductPending
  ] = useState(false)

  useEffect(() => {
    if (step === 4) {
      onSetIsCodeOfConductPending(true)
      if (configuration.codeOfConduct === codeOfConducts.contributorCovenant) {
        // Create CoC file
        const templateCode = shell
          .cat(`${__dirname}/templates/codesOfConduct/contributorCovenant.hbr`)
          .toString()
        const template = handlebars.compile(templateCode)
        const codeOfConductContent = template({
          year: `${new Date().getFullYear()}`,
          copyrightOwner: configuration.authorName
        })
        const codeOfConductPath = './CODE_OF_CONDUCT.md'
        shell.ShellString(codeOfConductContent).to(codeOfConductPath)
        onSetIsCodeOfConductPending(false)
        onNextStep()
      }
      else {
        onSetIsCodeOfConductPending(false)
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
          <Task
            isPending={isCodeOfConductPending}
            label='Creating code of conduct'
          />
        )}
        {(step >= 5) && (
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
    authorName: string,
    authorEmail: string,
    packageName: string,
    gitRepoUrl: string,
    license: string, // TODO: use enum
    codeOfConduct: string // TODO use enum
  })
}

module.exports = SetupProject
