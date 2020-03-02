const React = require('react');
const {bool, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {useNpmUsername} = require('./hooks')
const importJsx = require('import-jsx');

const Select = importJsx('./select');

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

const {current, completed} = states;

const options = [{
	label: 'Yes',
	value: 'true'
}, {
	label: 'Second',
	value: 'false'
}];

const ScopedPackageSelect = ({
	isScoped,
	onSetIsScoped,
	onSetScopeName,
	onSetStep,
	state
}) => {
	const npmUsername = useNpmUsername()
	return (
		<React.Fragment>
			{(state === current) && (
				<Box flexDirection="column">
					<Box flexDirection="row">
						<Text>- </Text>
						<Text bold>Is this a scoped package?</Text>
					</Box>
					<Box
						paddingTop={1}
						paddingLeft={2}
					>
						<Select
							options={[{
								label: 'Yes',
								value: true
							}, {
								label: 'No',
								value: false
							}]}
							value={isScoped}
							onChange={onSetIsScoped}
							onSelect={() => {
								if (isScoped) {
									const suggestedScopeName = (
										(npmUsername.length > 0)
											? `@${npmUsername}`
											: ''
									)
									onSetScopeName(suggestedScopeName);
									onSetStep(3);
								}
								else {
									onSetStep(4);
								}
							}}
						/>
					</Box>
				</Box>
			)}
			{(state === completed) && (
				<Box flexDirection="row">
					<Text>
						<Color green>
							{'✓ '}
						</Color>
					</Text>
					<Text>Is this a scoped package?</Text>
					{' '}
					<Text>{isScoped ? 'Yes' : 'No'}</Text>
				</Box>
			)}
		</React.Fragment>
	)
}

ScopedPackageSelect.states = states

ScopedPackageSelect.propTypes = {
	isScoped: bool,
	state: oneOf(Object.values(states)),
	onSetStep: func,
	onSetScopeName: func,
	onSetIsScoped: func
}

module.exports = ScopedPackageSelect;
