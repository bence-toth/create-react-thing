const DEBUG_MODE_ON = false

const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const {string, shape, oneOf} = require('prop-types')
const {Box, Text, Color} = require('ink')
const handlebars = require('handlebars')
const importJsx = require('import-jsx')

const Task = importJsx('../components/task.jsx')
const {licenses, codesOfConduct} = require('../enum')

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
      if (configuration.codeOfConduct === codesOfConduct.contributorCovenant) {
        // Create CoC file
        const templateCode = shell
          .cat(`${__dirname}/templates/codesOfConduct/contributorCovenant.hbr`)
          .toString()
        const template = handlebars.compile(templateCode)
        const codeOfConductContent = template({
          email: configuration.authorEmail
        })
        const codeOfConductPath = './code-of-conduct.md'
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

  // Step 5:
  // Add readme file
  const [
    isReadmePending,
    onSetIsReadmePending
  ] = useState(false)

  useEffect(() => {
    if (step === 5) {
      onSetIsReadmePending(true)
      const templateCode = shell
        .cat(`${__dirname}/templates/readme.hbr`)
        .toString()
      const availableScripts = shell
        .cat('./README.md')
        .toString()
      const template = handlebars.compile(templateCode, {noEscape: true})
      const readmeContent = template({
        packageName: configuration.packageName,
        hasDescription: configuration.description.length > 0,
        description: configuration.description,
        fullPackageName: (
          configuration.isScoped
            ? `${configuration.scopeName}/${configuration.packageName}`
            : configuration.packageName
        ),
        hasCodeOfConduct: configuration.codeOfConduct !== null,
        availableScripts,
        hasLicense: configuration.license !== null,
        license: configuration.license
      })
      const readmePath = './README.md'
      shell.ShellString(readmeContent).to(readmePath)
      onSetIsReadmePending(false)
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Step 6:
  // Update `package.json`
  const [
    isPackageJsonPending,
    onSetIsPackageJsonPending
  ] = useState(false)

  useEffect(() => {
    if (step === 6) {
      onSetIsPackageJsonPending(true)
      const packageJsonPath = './package.json'
      const {
        scripts,
        files,
        main,
        devDependencies,
        peerDependencies,
        dependencies
      } = JSON.parse((
        shell
          .cat(packageJsonPath)
          .toString()
      ))
      const updatedPackageObject = {
        name: (
          configuration.isScoped
            ? `${configuration.scopeName}/${configuration.packageName}`
            : configuration.packageName
        ),
        version: '1.0.0',
        ...(
          (configuration.description.length > 0)
            ? {
              description: configuration.description
            }
            : {}
        ),
        ...(
          (configuration.keywords.length > 0)
            ? {
              keywords: configuration.keywords
            }
            : {}
        ),
        ...(
          (configuration.license === licenses.mit)
            ? {
              license: 'MIT'
            }
            : {}
        ),
        scripts,
        author: {
          name: configuration.authorName,
          ...(
            (configuration.authorEmail.length > 0)
              ? {
                email: configuration.authorEmail
              }
              : {}
          ),
          ...(
            (configuration.authorWebsite.length > 0)
              ? {
                url: configuration.authorWebsite
              }
              : {}
          )
        },
        ...(
          (configuration.gitRepoUrl.length > 0)
            ? {
              // TODO: Remove tailing slash from git repo URL
              homepage: `${configuration.gitRepoUrl}#readme`,
              repository: {
                type: 'git',
                url: `${configuration.gitRepoUrl}.git`
              },
              bugs: {
                url: `${configuration.gitRepoUrl}/issues`
              }
            }
            : {}
        ),
        dependencies,
        peerDependencies,
        devDependencies,
        main,
        files
      }
      shell
        .ShellString(JSON.stringify(updatedPackageObject, null, 2))
        .to(packageJsonPath)
      onSetIsPackageJsonPending(false)
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Install packages (may take a few minutes)

  return (
    <>
      <Box
        flexDirection='column'
        paddingX={2}
      >
        {(step >= 1) && (
          <Task
            isPending={isGitClonePending}
            label='copying files'
          />
        )}
        {(step >= 2) && (
          <Task
            isPending={isGitProjectPending}
            label='starting new git project'
          />
        )}
        {(step >= 3) && (
          <Task
            isPending={isLicensePending}
            label='creating license file'
          />
        )}
        {(step >= 4) && (
          <Task
            isPending={isCodeOfConductPending}
            label='creating code of conduct'
          />
        )}
        {(step >= 5) && (
          <Task
            isPending={isReadmePending}
            label='creating readme file'
          />
        )}
        {(step >= 6) && (
          <Task
            isPending={isPackageJsonPending}
            label='creating package.json file'
          />
        )}
        {(step >= 7) && (
          <>
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
  )
}

SetupProject.propTypes = {
  configuration: shape({
    authorName: string,
    authorEmail: string,
    packageName: string,
    gitRepoUrl: string,
    license: oneOf(Object.values(licenses)),
    codeOfConduct: oneOf(Object.values(codesOfConduct))
  })
}

module.exports = SetupProject
