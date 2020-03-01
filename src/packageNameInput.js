const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {default: Input} = require('ink-text-input');
const {capitalizeString, validatePackageName} = require('./utility')

const {useEffect, useState} = React;

const states = {
	upcoming: 'upcoming',
	current: 'current',
	completed: 'completed'
};

const {current, completed} = states;

const PackageNameInput = ({
	onSetStep,
	state,
	packageName,
	onSetPackageName,
	onSetIsScoped,
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
		onSetValidationErrors(validatePackageName(packageName))
	}, [packageName])
	return (
		<React.Fragment>
			{(state === current) && (
				<Box flexDirection="column">
					<Box flexDirection="row">
						<Text>- </Text>
						<Text bold>npm package name: </Text>
						<Input
							value={packageName}
							onChange={value => {
								onSetIsDirty(true);
								onSetPackageName(value);
							}}
							onSubmit={() => {
								onSetIsDirty(true);
								if (!validationErrors) {
									if (packageName.includes('/')) {
										// Scoped package
										onSetIsScoped(true);
										const [scopeName, actualPackageName]
											= packageName.split('/');
										onSetPackageName(actualPackageName)
										onSetScopeName(scopeName);
										onSetStep(4);
									}
									else {
										onSetStep(2);
									}
								}
							}}
						/>
					</Box>
					{isDirty && validationErrors && (
						<Box paddingTop={1}>
							<Text>
								<Color bgKeyword='red'>
									[!]
								</Color>
								{' '}
								{capitalizeString(validationErrors[0])}
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
					<Text>npm package name: </Text>
					<Text>{packageName}</Text>
				</Box>
			)}
		</React.Fragment>
	)
}

PackageNameInput.states = states

PackageNameInput.propTypes = {
	onSetStep: func,
	state: oneOf(Object.values(PackageNameInput.states)),
	packageName: string,
	onSetPackageName: func,
	onSetIsScoped: func,
	onSetScopeName: func
}

module.exports = PackageNameInput;
