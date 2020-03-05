const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {stepStates} = require('../../enum')
const {codesOfConduct} = require('../../enum.js')
const importJsx = require('import-jsx')

const SelectStep = importJsx('../../components/selectStep.jsx')

const options = [{
  label: 'Contributor Covenant',
  value: codesOfConduct.contributorCovenant,
  default: true
}, {
  label: 'None',
  value: codesOfConduct.none
}]

const CodeOfConductSelect = ({
  codeOfConduct,
  onSetCodeOfConduct,
  onNextStep,
  state
}) => (
  <SelectStep
    state={state}
    label='code of conduct'
    value={codeOfConduct}
    options={options}
    onChange={onSetCodeOfConduct}
    onSubmit={() => {
      onNextStep()
    }}
  >
    {'Learn more about the Contributor Covenant here:'}
    {'https://www.contributor-covenant.org/'}
  </SelectStep>
)

// eslint-disable-next-line fp/no-mutation
CodeOfConductSelect.options = options

CodeOfConductSelect.propTypes = {
  codeOfConduct: string,
  state: oneOf(Object.values(stepStates)),
  onNextStep: func,
  onSetCodeOfConduct: func
}

module.exports = CodeOfConductSelect
