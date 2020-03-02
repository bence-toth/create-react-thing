const React = require('react');
const {useState} = React;
const {string, object, func, oneOf} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {useNpmUsername} = require('./hooks');
const importJsx = require('import-jsx');

const Header = importJsx('./header');
const PackageNameInput = importJsx('./packageNameInput');
const ScopedPackageSelect = importJsx('./scopedPackageSelect');
const ScopeNameInput = importJsx('./scopeNameInput');

const licenses = {
	mit: 'mit',
	none: 'none'
}

const codeOfConducts = {
	contributorCovenant: 'contributorCovenant',
	none: 'none'
}

const App = ({
	packageName: commandLineArgumentPackageName = '',
	flags
}) => {
	const [
		step,
		onSetStep
	] = useState(1)

	// Step 1: package name
	// Step 2: is it a scoped package
	// Step 3: scope name

	// Step 1: package name
	const [
		packageName,
		onSetPackageName
	] = useState(commandLineArgumentPackageName);

	// Step 2: is it a scoped package
	const [
		isScoped,
		onSetIsScoped
	] = useState(false);

	// Step 3: scope name
	const [
		scopeName,
		onSetScopeName
	] = useState('');

	// Step 4
	const [
		description,
		onSetDescription
	] = useState('');

	// Step 5
	const [
		keywords,
		onSetKeywords
	] = useState('');

	// Step 6
	const [
		gitRepositoryUrl,
		onSetGitRepositoryUrl
	] = useState('');

	// Step 7
	const [
		authorEmail,
		onSetAuthorEmail
	] = useState('');

	// Step 8
	const [
		license,
		onSetLicense
	] = useState(licenses.mit);

	// Step 9
	const [
		codeOfConduct,
		onSetCodeOfConduct
	] = useState(codeOfConducts.contributorCovenant);

	// Step 10
	const [
		npmUsername,
		onSetNpmUsername
	] = useNpmUsername();

	return (
		<Box
			flexDirection="column"
			paddingY={1}
			paddingX={2}
		>
			<Header
				step={step}
				packageName={(
					(isScoped && (scopeName.length > 0))
						? `${scopeName}/${packageName}`
						: packageName
				)}
			/>
			<PackageNameInput
				packageName={packageName}
				state={(() => {
					if (step === 1) {
						return PackageNameInput.states.current
					}
					if (step > 1) {
						return PackageNameInput.states.completed
					}
				})()}
				onSetPackageName={onSetPackageName}
				onSetStep={onSetStep}
				onSetIsScoped={onSetIsScoped}
				onSetScopeName={onSetScopeName}
			/>
			<ScopedPackageSelect
				isScoped={isScoped}
				state={(() => {
					if (step < 2) {
						return ScopedPackageSelect.states.upcoming
					}
					if (step === 2) {
						return ScopedPackageSelect.states.current
					}
					if (step > 2) {
						return ScopedPackageSelect.states.completed
					}
				})()}
				onSetIsScoped={onSetIsScoped}
				onSetStep={onSetStep}
			/>
			{isScoped && (
				<ScopeNameInput
					onSetStep={onSetStep}
					state={(() => {
						if (step < 3) {
							return ScopeNameInput.states.upcoming
						}
						if (step === 3) {
							return ScopeNameInput.states.current
						}
						if (step > 3) {
							return ScopeNameInput.states.completed
						}
					})()}
					scopeName={scopeName}
					onSetScopeName={onSetScopeName}
				/>
			)}
			{(Object.values(flags).length > 0) && (
				<>
					<Text>{' '}</Text>
					<Box flexDirection="column">
						{Object.keys(flags).map(flag => (
							<Box key={flag}>
								<Text>
									<Color red>{`  ${flag}: `}</Color>
								</Text>
								<Text>
									<Color white>{`${flags[flag]}`}</Color>
								</Text>
							</Box>
						))}
					</Box>
					<Text>{' '}</Text>
				</>
			)}
		</Box>
	);
}

App.propTypes = {
	packageName: string,
	flags: object
};

App.defaultProps = {
	flags: {}
};

module.exports = App;
