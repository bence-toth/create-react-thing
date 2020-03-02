const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: Input} = require('ink-text-input');
const {validateScopeName} = require('./utility')
const importJsx = require('import-jsx');

const ValidationError = importJsx('./validationError');

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
		<React.Fragment>
			{(state === current) && (
				<Box flexDirection="column">
					<Box flexDirection="row">
						<Text>- </Text>
						<Text bold>npm package scope name: </Text>
						<Input
							value={scopeName}
							onChange={value => {
								onSetIsDirty(true);
								onSetScopeName(value);
							}}
							onSubmit={() => {
								onSetIsDirty(true);
								if (!validationErrors) {
									onSetStep(4);
								}
							}}
						/>
					</Box>
					{isDirty && validationErrors && (
						<ValidationError>
							{validationErrors[0]}
						</ValidationError>
					)}
				</Box>
			)}
			{(state === completed) && (
				<Box flexDirection="row">
					<Text>
						<Color green>
							{'✓ '}
						</Color>
					</Text>
					<Text>npm package scope name: </Text>
					<Text>{scopeName}</Text>
				</Box>
			)}
		</React.Fragment>
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
