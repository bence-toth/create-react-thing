const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {validatePackageName} = require('./utility');
const {stepStates} = require('./enum');
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

const {useEffect, useState} = React;

const {current} = stepStates;

const PackageNameInput = ({
	onSkipScopeSteps,
	onNextStep,
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
		<InputStep
			state={state}
			label='npm package name'
			value={packageName}
			onChange={onSetPackageName}
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
						onSkipScopeSteps();
					}
					else {
						onNextStep();
					}
				}
			}}
			validationError={(isDirty && validationErrors) && (
				validationErrors[0]
			)}
		>
			{'Need help? Read more in the npm package name guidelines:'}
			{'https://docs.npmjs.com/package-name-guidelines'}
		</InputStep>
	)
}

PackageNameInput.propTypes = {
	onSkipScopeSteps: func,
	onNextStep: func,
	state: oneOf(Object.values(stepStates)),
	packageName: string,
	onSetPackageName: func,
	onSetIsScoped: func,
	onSetScopeName: func
}

module.exports = PackageNameInput;
