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
	onSetStep,
	state,
	description,
	onSetDescription
}) => (
	<InputStep
		state={state}
		label='description'
		value={description}
		onChange={onSetDescription}
		onSubmit={() => {
			onSetStep(5);
		}}
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
