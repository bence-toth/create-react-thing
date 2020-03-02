const React = require('react');
const {string, func, oneOf, oneOfType, bool} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: Input} = require('ink-text-input');
const importJsx = require('import-jsx');

const ValidationError = importJsx('./validationError');

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

const {current, completed} = states;

const InputStep = ({
	state,
	label,
	value,
	onChange,
	onSubmit,
	validationError
}) => (
	<React.Fragment>
		{(state === current) && (
			<Box flexDirection="column">
				<Box flexDirection="row">
					<Text>- </Text>
					<Text bold>{`${label}: `}</Text>
					<Input
						value={value}
						onChange={onChange}
						onSubmit={onSubmit}
					/>
				</Box>
				{validationError && (
					<ValidationError>
						{validationError}
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
				<Text>{`${label}: `}</Text>
				<Text>
					<Color blueBright>
						{value}
					</Color>
				</Text>
			</Box>
		)}
	</React.Fragment>
)

InputStep.states = states

InputStep.propTypes = {
	state: oneOf(Object.values(InputStep.states)),
	label: string,
	value: string,
	onChange: func,
	onSubmit: func,
	validationError: oneOfType([string, bool])
}

module.exports = InputStep;
