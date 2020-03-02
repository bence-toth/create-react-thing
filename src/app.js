const React = require('react');
const {useState} = React;
const {string, object} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {licenses, codeOfConducts, stepStates} = require('./enum')
const importJsx = require('import-jsx');

const Header = importJsx('./header');
const PackageNameInput = importJsx('./packageNameInput');
const ScopedPackageSelect = importJsx('./scopedPackageSelect');
const ScopeNameInput = importJsx('./scopeNameInput');
const DescriptionInput = importJsx('./descriptionInput');
const KeywordsInput = importJsx('./keywordsInput.js');

const {current, completed} = stepStates;

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
	// Step 4: description

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

	// Step 4: description
	const [
		description,
		onSetDescription
	] = useState('');

	// Step 5
	const [
		keywords,
		onSetKeywords
	] = useState([]);

	// // Step 6
	// const [
	// 	gitRepositoryUrl,
	// 	onSetGitRepositoryUrl
	// ] = useState('');

	// // Step 7
	// const [
	// 	authorEmail,
	// 	onSetAuthorEmail
	// ] = useState('');

	// // Step 8
	// const [
	// 	license,
	// 	onSetLicense
	// ] = useState(licenses.mit);

	// // Step 9
	// const [
	// 	codeOfConduct,
	// 	onSetCodeOfConduct
	// ] = useState(codeOfConducts.contributorCovenant);

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
						return current
					}
					if (step > 1) {
						return completed
					}
				})()}
				onSetPackageName={onSetPackageName}
				onNextStep={() => {
					onSetStep(2)
				}}
				onSkipScopeSteps={() => {
					onSetStep(4)
				}}
				onSetIsScoped={onSetIsScoped}
				onSetScopeName={onSetScopeName}
			/>
			<ScopedPackageSelect
				isScoped={isScoped}
				state={(() => {
					if (step === 2) {
						return current
					}
					if (step > 2) {
						return completed
					}
				})()}
				onSetIsScoped={onSetIsScoped}
				onSetScopeName={onSetScopeName}
				onNextStep={() => {
					onSetStep(3)
				}}
				onSkipScopeNameStep={() => {
					onSetStep(4)
				}}
			/>
			{isScoped && (
				<ScopeNameInput
					onNextStep={() => {
						onSetStep(4)
					}}
					state={(() => {
						if (step === 3) {
							return current
						}
						if (step > 3) {
							return completed
						}
					})()}
					scopeName={scopeName}
					onSetScopeName={onSetScopeName}
				/>
			)}
			<DescriptionInput
				description={description}
				state={(() => {
					if (step === 4) {
						return current
					}
					if (step > 4) {
						return completed
					}
				})()}
				onSetDescription={onSetDescription}
				onNextStep={() => {
					onSetStep(5)
				}}
			/>
			<KeywordsInput
				keywords={keywords}
				state={(() => {
					if (step === 5) {
						return current
					}
					if (step > 5) {
						return completed
					}
				})()}
				onSetKeywords={onSetKeywords}
				onNextStep={() => {
					onSetStep(6)
				}}
			/>
			<Box paddingTop={2}>
				<Text>
					<Color blueBright>
						{JSON.stringify({
							packageName,
							isScoped,
							scopeName,
							description,
							keywords
						})}
					</Color>
				</Text>
			</Box>
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
