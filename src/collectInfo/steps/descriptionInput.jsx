const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {stepStates} = require('../../enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('../../components/inputStep.jsx')

const DescriptionInput = ({
  onNextStep,
  state,
  description,
  onSetDescription
}) => (
  <InputStep
    state={state}
    label='description'
    value={description}
    fallback='blank'
    onChange={onSetDescription}
    onSubmit={onNextStep}
  >
    {'Description helps people discover your package,'}
    {'as it’s listed in npm search.'}
  </InputStep>
)

DescriptionInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  description: string,
  onSetDescription: func
}

module.exports = DescriptionInput
