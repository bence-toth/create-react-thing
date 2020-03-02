const React = require('react');
const {string, func, oneOf, oneOfType, bool} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: Input} = require('ink-text-input');
const {stepStates} = require('./enum')
const importJsx = require('import-jsx');

const ValidationError = importJsx('./validationError');

const {current, completed} = stepStates;

const InputStep = ({
	state,
	label,
	value,
	fallback,
	onChange,
	onSubmit,
	validationError,
	children
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
				{children && (
					<Box
						flexDirection="row"
						paddingTop={1}
					>
						<Text>
							<Color bgKeyword='blue'>
								(ℹ)
							</Color>
						</Text>
						<Text>
							{children.map((line, lineIndex) => {
								if (lineIndex === 0) {
									return ` ${line}\n`
								}
								return `    ${line}`
							}).join('')}
						</Text>
					</Box>
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
					{(
						(value.length > 0)
						? (
							<Color blueBright>
								{value}
							</Color>
						)
						: (
							<Color gray>
								{fallback}
							</Color>
						)
					)}
				</Text>
			</Box>
		)}
	</React.Fragment>
)

InputStep.propTypes = {
	state: oneOf(Object.values(stepStates)),
	label: string,
	value: string,
	fallback: string,
	onChange: func,
	onSubmit: func,
	validationError: oneOfType([string, bool]),
	children: node
}

module.exports = InputStep;
