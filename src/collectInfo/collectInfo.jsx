/* eslint-disable react/jsx-props-no-spreading */
const React = require('react')

const {useState, useEffect} = React
const {string, func} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {stepStates} = require('../enum')
const importJsx = require('import-jsx')

const Header = importJsx('../components/header.jsx')
const PackageNameInput = importJsx('./steps/packageNameInput.jsx')
const ScopedPackageSelect = importJsx('./steps/scopedPackageSelect.jsx')
const ScopeNameInput = importJsx('./steps/scopeNameInput.jsx')
const DescriptionInput = importJsx('./steps/descriptionInput.jsx')
const KeywordsInput = importJsx('./steps/keywordsInput.jsx')
const GitRepoUrlInput = importJsx('./steps/gitRepoUrlInput.jsx')
const AuthorNameInput = importJsx('./steps/authorNameInput.jsx')
const AuthorEmailInput = importJsx('./steps/authorEmailInput.jsx')
const AuthorWebsiteInput = importJsx('./steps/authorWebsiteInput.jsx')
const LicenseSelect = importJsx('./steps/licenseSelect.jsx')
const CodeOfConductSelect = importJsx('./steps/codeOfConductSelect.jsx')

const {upcoming, current, completed} = stepStates

const getStepState = ({
  currentStep,
  stepNumber
}) => {
  if (currentStep === stepNumber) {
    return current
  }

  if (currentStep > stepNumber) {
    return completed
  }
  return upcoming
}

// eslint-disable-next-line unicorn/prevent-abbreviations
const getStepProps = ({
  currentStep,
  stepNumber,
  onSetStep
}) => ({
  state: getStepState({
    currentStep,
    stepNumber
  }),
  onNextStep: () => {
    onSetStep(stepNumber + 1)
  }
})

const CollectInfo = ({
  packageName: commandLineArgumentPackageName = '',
  onSaveConfiguration
  // TODO: flags
}) => {
  const [
    step,
    onSetStep
  ] = useState(1)

  // Package name
  const [
    packageName,
    onSetPackageName
  ] = useState(commandLineArgumentPackageName)

  // Is it a scoped package?
  const defaultIsScoped = ScopedPackageSelect
    .options
    .find(option => option.default)
    .value
  const [
    isScoped,
    onSetIsScoped
  ] = useState(defaultIsScoped)

  // Scope name
  const [
    scopeName,
    onSetScopeName
  ] = useState('')

  // Description
  const [
    description,
    onSetDescription
  ] = useState('')

  // Keywords
  const [
    keywords,
    onSetKeywords
  ] = useState([])

  // Git repo URL
  const [
    gitRepoUrl,
    onSetGitRepoUrl
  ] = useState('')

  // Author name
  const [
    authorName,
    onSetAuthorName
  ] = useState('')

  // Author email
  const [
    authorEmail,
    onSetAuthorEmail
  ] = useState('')

  // Author website
  const [
    authorWebsite,
    onSetAuthorWebsite
  ] = useState('')

  // License
  const defaultLicense = LicenseSelect
    .options
    .find(option => option.default)
    .value
  const [
    license,
    onSetLicense
  ] = useState(defaultLicense)

  // CoC
  const defaultCodeOfConduct = CodeOfConductSelect
    .options
    .find(option => option.default)
    .value
  const [
    codeOfConduct,
    onSetCodeOfConduct
  ] = useState(defaultCodeOfConduct)

  // Save everything when done
  useEffect(() => {
    if (step === 12) {
      onSaveConfiguration({
        packageName,
        isScoped,
        scopeName,
        description,
        keywords,
        gitRepoUrl,
        authorName,
        authorEmail,
        authorWebsite,
        license
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <Box
      flexDirection='column'
      paddingY={1}
      paddingX={2}
    >
      <Header
        step={step}
        packageName={packageName}
        scopeName={isScoped && scopeName}
      />
      <PackageNameInput
        packageName={packageName}
        onSetPackageName={onSetPackageName}
        onSkipScopeSteps={() => {
          onSetStep(4)
        }}
        onSetIsScoped={onSetIsScoped}
        onSetScopeName={onSetScopeName}
        {...getStepProps({
          currentStep: step,
          stepNumber: 1,
          onSetStep
        })}
      />
      <ScopedPackageSelect
        isScoped={isScoped}
        onSetIsScoped={onSetIsScoped}
        onSetScopeName={onSetScopeName}
        onSkipScopeNameStep={() => {
          onSetStep(4)
        }}
        {...getStepProps({
          currentStep: step,
          stepNumber: 2,
          onSetStep
        })}
      />
      {isScoped && (
        <ScopeNameInput
          scopeName={scopeName}
          onSetScopeName={onSetScopeName}
          {...getStepProps({
            currentStep: step,
            stepNumber: 3,
            onSetStep
          })}
        />
      )}
      <DescriptionInput
        description={description}
        onSetDescription={onSetDescription}
        {...getStepProps({
          currentStep: step,
          stepNumber: 4,
          onSetStep
        })}
      />
      <KeywordsInput
        keywords={keywords}
        onSetKeywords={onSetKeywords}
        {...getStepProps({
          currentStep: step,
          stepNumber: 5,
          onSetStep
        })}
      />
      <GitRepoUrlInput
        gitRepoUrl={gitRepoUrl}
        onSetGitRepoUrl={onSetGitRepoUrl}
        {...getStepProps({
          currentStep: step,
          stepNumber: 6,
          onSetStep
        })}
      />
      <LicenseSelect
        license={license}
        onSetLicense={onSetLicense}
        {...getStepProps({
          currentStep: step,
          stepNumber: 7,
          onSetStep
        })}
      />
      <CodeOfConductSelect
        codeOfConduct={codeOfConduct}
        onSetCodeOfConduct={onSetCodeOfConduct}
        {...getStepProps({
          currentStep: step,
          stepNumber: 8,
          onSetStep
        })}
      />
      <AuthorNameInput
        authorName={authorName}
        onSetAuthorName={onSetAuthorName}
        {...getStepProps({
          currentStep: step,
          stepNumber: 9,
          onSetStep
        })}
      />
      <AuthorEmailInput
        authorEmail={authorEmail}
        onSetAuthorEmail={onSetAuthorEmail}
        isRequiredForCodeOfConduct={
          codeOfConduct === 'contributorCovenant'
        }
        {...getStepProps({
          currentStep: step,
          stepNumber: 10,
          onSetStep
        })}
      />
      <AuthorWebsiteInput
        authorWebsite={authorWebsite}
        onSetAuthorWebsite={onSetAuthorWebsite}
        {...getStepProps({
          currentStep: step,
          stepNumber: 11,
          onSetStep
        })}
      />
      <Box
        paddingTop={2}
        flexDirection='column'
      >
        <Text>
          <Color yellow>
            {'DEBUG: '}
            {JSON.stringify({step})}
          </Color>
        </Text>
        <Text>
          <Color blueBright>
            {'DEBUG: '}
            {JSON.stringify({
              packageName,
              isScoped,
              scopeName,
              description,
              keywords,
              gitRepoUrl,
              authorName,
              authorEmail,
              authorWebsite,
              license
            })}
          </Color>
        </Text>
      </Box>
    </Box>
  )
}

CollectInfo.propTypes = {
  packageName: string,
  onSaveConfiguration: func
  // TODO: flags: object
}

CollectInfo.defaultProps = {
  // TODO: flags: {}
}

module.exports = CollectInfo
