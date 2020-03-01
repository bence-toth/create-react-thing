const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: TextInput} = require('ink-text-input');

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
}

const {current, completed} = states

const PackageNameInput = ({
	onSetStep,
	state,
	packageName,
	onSetPackageName
}) => (
	<React.Fragment>
		{(state === current) && (
			<Box flexDirection="row">
				<Text>- </Text>
				<Text bold>npm package name: </Text>
				<TextInput
					value={packageName}
					onChange={onSetPackageName}
					onSubmit={() => {
						onSetStep(2)
					}}
				/>
			</Box>
		)}
		{(state === completed) && (
			<Box flexDirection="row">
				<Text>
					<Color green>
						{'✓ '}
					</Color>
				</Text>
				<Text>npm package name: </Text>
				<Text>{packageName}</Text>
			</Box>
		)}
	</React.Fragment>
)

PackageNameInput.states = states

PackageNameInput.propTypes = {
	onSetStep: func,
	state: oneOf(Object.values(PackageNameInput.states)),
	packageName: string,
	onSetPackageName: func
};

module.exports = PackageNameInput;
