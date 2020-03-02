const React = require('react');
const {bool, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {useNpmUsername} = require('./hooks');
const {stepStates} = require('./enum');
const importJsx = require('import-jsx');

const Select = importJsx('./select');

const {current, completed} = stepStates;

const options = [{
	label: 'Yes',
	value: true
}, {
	label: 'No',
	value: false
}];

const ScopedPackageSelect = ({
	isScoped,
	onSetIsScoped,
	onSetScopeName,
	onNextStep,
	onSkipScopeNameStep,
	state
}) => {
	const npmUsername = useNpmUsername();
	return (
		<>
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
							options={options}
							value={isScoped}
							onChange={onSetIsScoped}
							onSelect={() => {
								if (isScoped) {
									const suggestedScopeName = (
										(npmUsername.length > 0) ?
											`@${npmUsername}` :
											''
									);
									onSetScopeName(suggestedScopeName);
									onNextStep();
								}
								else {
									onSkipScopeNameStep();
								}
							}}
						/>
					</Box>
					<Box
						flexDirection="row"
						paddingTop={1}
					>
						<Text>
							<Color bgKeyword="blue">
								(ℹ)
							</Color>
						</Text>
						<Text>
							{[
								'Need help? Read more about scopes in the npm documentation:',
								'https://docs.npmjs.com/about-scopes'
							].map((line, lineIndex) => {
								if (lineIndex === 0) {
									return ` ${line}\n`;
								}

								return `    ${line}`;
							}).join('')}
						</Text>
					</Box>
				</Box>
			)}
			{(state === completed) && (
				<Box flexDirection="row">
					<Text>
						<Color greenBright>
							{'✓ '}
						</Color>
					</Text>
					<Text>Is this a scoped package?</Text>
					{' '}
					<Text>
						<Color blueBright>
							{isScoped ? 'Yes' : 'No'}
						</Color>
					</Text>
				</Box>
			)}
		</>
	);
};

ScopedPackageSelect.propTypes = {
	isScoped: bool,
	state: oneOf(Object.values(stepStates)),
	onNextStep: func,
	onSkipScopeNameStep: func,
	onSetScopeName: func,
	onSetIsScoped: func
};

module.exports = ScopedPackageSelect;
