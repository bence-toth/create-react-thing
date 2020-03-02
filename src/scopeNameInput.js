const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: Input} = require('ink-text-input');
const {validateScopeName} = require('./utility')
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

const {useEffect, useState} = React;

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

const {current, completed} = states;

const ScopeNameInput = ({
	onSetStep,
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
					onSetStep(4);
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
	onSetStep: func,
	state: oneOf(Object.values(ScopeNameInput.states)),
	scopeName: string,
	onSetScopeName: func
}

module.exports = ScopeNameInput;
