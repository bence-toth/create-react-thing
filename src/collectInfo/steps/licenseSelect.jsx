const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {stepStates} = require('../../enum')
const importJsx = require('import-jsx')

const SelectStep = importJsx('../../components/selectStep.jsx')

const options = [{
  label: 'MIT',
  value: 'MIT',
  default: true
}, {
  label: 'None',
  value: null
}]

const LicenseSelect = ({
  license,
  onSetLicense,
  onNextStep,
  state
}) => (
  <SelectStep
    state={state}
    label='license'
    value={license}
    options={options}
    onChange={onSetLicense}
    onSubmit={() => {
      onNextStep()
    }}
  >
    {'Learn more about the MIT license here:'}
    {'https://choosealicense.com/licenses/mit/'}
    {''}
    {'Need help choosing a license? Check out this:'}
    {'https://choosealicense.com/'}
  </SelectStep>
)

// eslint-disable-next-line fp/no-mutation
LicenseSelect.options = options

LicenseSelect.propTypes = {
  license: string,
  state: oneOf(Object.values(stepStates)),
  onNextStep: func,
  onSetLicense: func
}

module.exports = LicenseSelect
