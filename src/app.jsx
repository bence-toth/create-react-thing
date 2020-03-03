/* eslint-disable react/jsx-props-no-spreading */
const React = require('react')

const {useState} = React
const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {stepStates} = require('./enum')
const importJsx = require('import-jsx')

const Header = importJsx('./header.jsx')
const PackageNameInput = importJsx('./packageNameInput.jsx')
const ScopedPackageSelect = importJsx('./scopedPackageSelect.jsx')
const ScopeNameInput = importJsx('./scopeNameInput.jsx')
const DescriptionInput = importJsx('./descriptionInput.jsx')
const KeywordsInput = importJsx('./keywordsInput.jsx')
const GitRepoUrlInput = importJsx('./gitRepoUrlInput.jsx')
const AuthorNameInput = importJsx('./authorNameInput.jsx')
const AuthorEmailInput = importJsx('./authorEmailInput.jsx')
const AuthorWebsiteInput = importJsx('./authorWebsiteInput.jsx')

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

const App = ({
  packageName: commandLineArgumentPackageName = ''
  // TODO: flags
}) => {
  const [
    step,
    onSetStep
  ] = useState(1)

  // Step 1: package name
  // Step 2: is it a scoped package
  // Step 3: scope name
  // Step 4: description
  // Step 5: keywords
  // Step 6: git repo
  // Step 7: Author name
  // Step 8: Author email
  // Step 9: Author website
  // Step 10: License
  // Step 11: CoC

  // Step 1: package name
  const [
    packageName,
    onSetPackageName
  ] = useState(commandLineArgumentPackageName)

  // Step 2: is it a scoped package
  const [
    isScoped,
    onSetIsScoped
  ] = useState(false)

  // Step 3: scope name
  const [
    scopeName,
    onSetScopeName
  ] = useState('')

  // Step 4: description
  const [
    description,
    onSetDescription
  ] = useState('')

  // Step 5: keywords
  const [
    keywords,
    onSetKeywords
  ] = useState([])

  // Step 6: git repo
  const [
    gitRepoUrl,
    onSetGitRepoUrl
  ] = useState('')

  // Step 7: Author name
  const [
    authorName,
    onSetAuthorName
  ] = useState('')

  // Step 8: Author email
  const [
    authorEmail,
    onSetAuthorEmail
  ] = useState('')

  // Step 9: Author website
  const [
    authorWebsite,
    onSetAuthorWebsite
  ] = useState('')

  // Step 10: License
  // Step 11: CoC

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Box
      flexDirection='column'
      paddingY={1}
      paddingX={2}
    >
      <Header
        step={step}
        packageName={(
          (isScoped && (scopeName.length > 0))
            ? `${scopeName}/${packageName}`
            : packageName
        )}
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
      <AuthorNameInput
        authorName={authorName}
        onSetAuthorName={onSetAuthorName}
        {...getStepProps({
          currentStep: step,
          stepNumber: 7,
          onSetStep
        })}
      />
      <AuthorEmailInput
        authorEmail={authorEmail}
        onSetAuthorEmail={onSetAuthorEmail}
        {...getStepProps({
          currentStep: step,
          stepNumber: 8,
          onSetStep
        })}
      />
      <AuthorWebsiteInput
        authorWebsite={authorWebsite}
        onSetAuthorWebsite={onSetAuthorWebsite}
        {...getStepProps({
          currentStep: step,
          stepNumber: 9,
          onSetStep
        })}
      />
      <Box
        paddingTop={2}
        flexDirection='column'
      >
        <Text>
          <Color yellow>
            {JSON.stringify({step})}
          </Color>
        </Text>
        <Text>
          <Color blueBright>
            {JSON.stringify({
              packageName,
              isScoped,
              scopeName,
              description,
              keywords,
              gitRepoUrl,
              authorName,
              authorEmail,
              authorWebsite
            })}
          </Color>
        </Text>
      </Box>
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
