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
  // Step 9: Author website
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
        state={getStepState({
          currentStep: step,
          stepNumber: 1
        })}
        onSetPackageName={onSetPackageName}
        onNextStep={() => {
          onSetStep(2)
        }}
        onSkipScopeSteps={() => {
          onSetStep(4)
        }}
        onSetIsScoped={onSetIsScoped}
        onSetScopeName={onSetScopeName}
      />
      <ScopedPackageSelect
        isScoped={isScoped}
        state={getStepState({
          currentStep: step,
          stepNumber: 2
        })}
        onSetIsScoped={onSetIsScoped}
        onSetScopeName={onSetScopeName}
        onNextStep={() => {
          onSetStep(3)
        }}
        onSkipScopeNameStep={() => {
          onSetStep(4)
        }}
      />
      {isScoped && (
      <ScopeNameInput
        state={getStepState({
          currentStep: step,
          stepNumber: 3
        })}
        scopeName={scopeName}
        onNextStep={() => {
          onSetStep(4)
        }}
        onSetScopeName={onSetScopeName}
      />
      )}
      <DescriptionInput
        description={description}
        state={getStepState({
          currentStep: step,
          stepNumber: 4
        })}
        onSetDescription={onSetDescription}
        onNextStep={() => {
          onSetStep(5)
        }}
      />
      <KeywordsInput
        keywords={keywords}
        state={getStepState({
          currentStep: step,
          stepNumber: 5
        })}
        onSetKeywords={onSetKeywords}
        onNextStep={() => {
          onSetStep(6)
        }}
      />
      <GitRepoUrlInput
        onNextStep={() => {
          onSetStep(7)
        }}
        state={getStepState({
          currentStep: step,
          stepNumber: 6
        })}
        gitRepoUrl={gitRepoUrl}
        onSetGitRepoUrl={onSetGitRepoUrl}
      />
      <AuthorNameInput
        onNextStep={() => {
          onSetStep(8)
        }}
        state={getStepState({
          currentStep: step,
          stepNumber: 7
        })}
        authorName={authorName}
        onSetAuthorName={onSetAuthorName}
      />
      <Box paddingTop={2}>
        <Text>
          <Color blueBright>
            {JSON.stringify({
              packageName,
              isScoped,
              scopeName,
              description,
              keywords
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
