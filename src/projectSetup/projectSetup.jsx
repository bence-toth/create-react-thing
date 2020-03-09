const DEBUG_MODE_ON = false

const React = require('react')

const {useEffect} = React
const {string, shape, oneOf, func, bool, arrayOf} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {
  useStep,
  useStartSetup,
  useCloneRepoStep,
  useStartGitProject,
  useCreateLicense,
  useCreateCodeOfConduct,
  useCreateReadme,
  useUpdatePackageJson,
  useInstallPackages,
  useCreateGitCommit
} = require('./hooks')
const importJsx = require('import-jsx')

const Task = importJsx('../components/task.jsx')
const {licenses, codesOfConduct} = require('../enum')

const SetupProject = ({
  configuration,
  onHasFinished
}) => {
  const [step, onNextStep] = useStep()

  useStartSetup({
    onNextStep,
    hasConfigurationArrived: (
      Object.keys(configuration).length > 0
    )
  })

  const isGitClonePending = useCloneRepoStep({
    step,
    onNextStep,
    packageName: configuration.packageName
  })

  const isGitProjectPending = useStartGitProject({
    step,
    onNextStep,
    packageName: configuration.packageName,
    gitRepoUrl: configuration.gitRepoUrl
  })

  const isLicensePending = useCreateLicense({
    step,
    onNextStep,
    license: configuration.license,
    authorName: configuration.authorName
  })

  const isCodeOfConductPending = useCreateCodeOfConduct({
    step,
    onNextStep,
    codeOfConduct: configuration.codeOfConduct,
    authorEmail: configuration.authorEmail
  })

  const isReadmePending = useCreateReadme({
    step,
    onNextStep,
    packageName: configuration.packageName,
    description: configuration.description,
    isScoped: configuration.isScoped,
    scopeName: configuration.scopeName,
    codeOfConduct: configuration.codeOfConduct,
    license: configuration.license
  })

  const isPackageJsonPending = useUpdatePackageJson({
    step,
    onNextStep,
    isScoped: configuration.isScoped,
    scopeName: configuration.scopeName,
    packageName: configuration.packageName,
    description: configuration.description,
    keywords: configuration.keywords,
    license: configuration.license,
    authorName: configuration.authorName,
    authorEmail: configuration.authorEmail,
    authorWebsite: configuration.authorWebsite,
    gitRepoUrl: configuration.gitRepoUrl
  })

  const isNpmInstallPending = useInstallPackages({
    step,
    onNextStep
  })

  const isGitCommitPending = useCreateGitCommit({
    step,
    onNextStep
  })

  useEffect(() => {
    if (step === 9) {
      setTimeout(() => {
        onHasFinished()
      }, 1500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <>
      <Box
        flexDirection='column'
        paddingX={2}
      >
        {(step >= 1) && (
          <Task
            isPending={isGitClonePending}
            label={(
              isGitClonePending
                ? 'copying files, this may take a few seconds'
                : 'copying files'
            )}
            isLong
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
              isPending={isNpmInstallPending}
              label={(
                isNpmInstallPending
                  ? 'installing packages, this may take a few minutes'
                  : 'installing packages'
              )}
              isLong
            />
          </>
        )}
        {(step >= 8) && (
          <Task
            isPending={isGitCommitPending}
            label='creating git commit'
          />
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
    codeOfConduct: oneOf(Object.values(codesOfConduct)),
    description: string,
    isScoped: bool,
    scopeName: string,
    keywords: arrayOf(string),
    authorWebsite: string
  }),
  onHasFinished: func
}

module.exports = SetupProject
