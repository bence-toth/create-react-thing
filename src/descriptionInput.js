const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {stepStates} = require('./enum')
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

const DescriptionInput = ({
	onNextStep,
	state,
	description,
	onSetDescription
}) => (
	<InputStep
		state={state}
		label='Description'
		value={description}
		fallback='blank'
		onChange={onSetDescription}
		onSubmit={onNextStep}
	/>
)

DescriptionInput.propTypes = {
	onSetStep: func,
	state: oneOf(Object.values(stepStates)),
	description: string,
	onSetDescription: func
}

module.exports = DescriptionInput;
