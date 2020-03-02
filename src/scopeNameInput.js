const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {validateScopeName} = require('./utility')
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

const {useEffect, useState} = React;

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

const {current} = states;

const ScopeNameInput = ({
	onNextStep,
	state,
	scopeName,
	onSetScopeName
}) => {
	const [isDirty, onSetIsDirty] = useState(false)
	useEffect(() => {
		if (state === current) {
			onSetIsDirty(false);
		}
	}, [state]);
	const [validationErrors, onSetValidationErrors] = useState();
	useEffect(() => {
		onSetValidationErrors(validateScopeName(scopeName))
	}, [scopeName])
	return (
		<InputStep
			state={state}
			label='npm package scope name'
			value={scopeName}
			onChange={onSetScopeName}
			onSubmit={() => {
				onSetIsDirty(true);
				if (!validationErrors) {
					onNextStep();
				}
			}}
			validationError={(isDirty && validationErrors) && (
				validationErrors[0]
			)}
		/>
	)
}

ScopeNameInput.states = states

ScopeNameInput.propTypes = {
	onNextStep: func,
	state: oneOf(Object.values(ScopeNameInput.states)),
	scopeName: string,
	onSetScopeName: func
}

module.exports = ScopeNameInput;
