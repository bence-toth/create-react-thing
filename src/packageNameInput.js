const React = require('react');
const {string, func, oneOf} = require('prop-types');
const {validatePackageName} = require('./utility')
const importJsx = require('import-jsx');

const InputStep = importJsx('./inputStep.js')

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
						onSetStep(4);
					}
					else {
						onSetStep(2);
					}
				}
			}}
			validationError={(isDirty && validationErrors) && (
				validationErrors[0]
			)}
		/>
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
