const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {validateScopeName} = require('./utility')
const {stepStates} = require('../../enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('../../components/inputStep.jsx')

const {useEffect, useState} = React

const {current} = stepStates

const ScopeNameInput = ({
  onNextStep,
  state,
  scopeName,
  onSetScopeName
}) => {
  const [isDirty, onSetIsDirty] = useState(false)
  useEffect(() => {
    if (state === current) {
      onSetIsDirty(false)
    }
  }, [state])
  const [validationErrors, onSetValidationErrors] = useState()
  useEffect(() => {
    onSetValidationErrors(validateScopeName(scopeName))
  }, [scopeName])
  return (
    <InputStep
      state={state}
      label='npm package scope name'
      value={scopeName}
      validationError={(isDirty && validationErrors) && (
        validationErrors[0]
      )}
      onChange={onSetScopeName}
      onSubmit={() => {
        onSetIsDirty(true)
        if (!validationErrors) {
          onNextStep()
        }
      }}
    >
      {'Need help? Read more about scopes in the npm documentation:'}
      {'https://docs.npmjs.com/about-scopes'}
    </InputStep>
  )
}

ScopeNameInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  scopeName: string,
  onSetScopeName: func
}

module.exports = ScopeNameInput
