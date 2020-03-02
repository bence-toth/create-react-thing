const React = require('react');
const {string, func, oneOf} = require('prop-types');
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

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

DescriptionInput.states = states

DescriptionInput.propTypes = {
	onSetStep: func,
	state: oneOf(Object.values(DescriptionInput.states)),
	description: string,
	onSetDescription: func
}

module.exports = DescriptionInput;
