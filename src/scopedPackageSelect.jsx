const React = require('react')
const {bool, func, oneOf} = require('prop-types')
const {useNpmUsername} = require('./hooks')
const {stepStates} = require('./enum')
const importJsx = require('import-jsx')

const SelectStep = importJsx('./selectStep.jsx')

const options = [{
  label: 'Yes',
  value: true
}, {
  label: 'No',
  value: false
}]

const ScopedPackageSelect = ({
  isScoped,
  onSetIsScoped,
  onSetScopeName,
  onNextStep,
  onSkipScopeNameStep,
  state
}) => {
  const npmUsername = useNpmUsername()
  return (
    <SelectStep
      state={state}
      label='Is this a scoped package?'
      value={isScoped}
      options={options}
      onChange={onSetIsScoped}
      onSubmit={() => {
        if (isScoped) {
          const suggestedScopeName = (
            (npmUsername.length > 0)
              ? `@${npmUsername}`
              : ''
          )
          onSetScopeName(suggestedScopeName)
          onNextStep()
        }
        else {
          onSkipScopeNameStep()
        }
      }}
    >
      {'Need help? Read more about scopes in the npm documentation:'}
      {'https://docs.npmjs.com/about-scopes'}
    </SelectStep>
  )
}

ScopedPackageSelect.propTypes = {
  isScoped: bool,
  state: oneOf(Object.values(stepStates)),
  onNextStep: func,
  onSkipScopeNameStep: func,
  onSetScopeName: func,
  onSetIsScoped: func
}

module.exports = ScopedPackageSelect
