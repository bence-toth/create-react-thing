const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {validateGitRepoUrl} = require('./utility')
const {stepStates} = require('../../enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('../../components/inputStep.jsx')

const {useEffect, useState} = React

const {current} = stepStates

const GitRepoUrlInput = ({
  onNextStep,
  state,
  gitRepoUrl,
  onSetGitRepoUrl
}) => {
  const [isDirty, onSetIsDirty] = useState(false)
  useEffect(() => {
    if (state === current) {
      onSetIsDirty(false)
    }
  }, [state])
  const [validationErrors, onSetValidationErrors] = useState()
  useEffect(() => {
    onSetValidationErrors(validateGitRepoUrl(gitRepoUrl))
  }, [gitRepoUrl])
  return (
    <InputStep
      state={state}
      label='git repository'
      fallback='blank'
      value={gitRepoUrl}
      validationError={(isDirty && validationErrors) && (
        validationErrors[0]
      )}
      onChange={onSetGitRepoUrl}
      onSubmit={() => {
        onSetIsDirty(true)
        if (!validationErrors || (gitRepoUrl.length === 0)) {
          onNextStep()
        }
      }}
    >
      {'This is used to fill in the `repository`, `homepage`,'}
      {'and `bugs` fields in the `package.json` file.'}
      {''}
      {'Read more about these here:'}
      {'- https://docs.npmjs.com/files/package.json#repository'}
      {'- https://docs.npmjs.com/files/package.json#bugs'}
      {'- https://docs.npmjs.com/files/package.json#homepage'}
      {''}
      {'Only GitHub repositories are supported.'}
      {'If you host your code somewhere else, leave this blank,'}
      {'and fill in this info in the `package.json` file later.'}
    </InputStep>
  )
}

GitRepoUrlInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  gitRepoUrl: string,
  onSetGitRepoUrl: func
}

module.exports = GitRepoUrlInput
