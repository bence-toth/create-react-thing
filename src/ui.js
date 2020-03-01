const React = require('react');
const {useState, useEffect} = React;
const {string, object} = require('prop-types');
const {Box, Text, Color} = require('ink');
const {useNpmUsername} = require('./hooks');
const {default: TextInput} = require('ink-text-input');

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

	// Step 1
	const [
		packageName,
		onSetPackageName
	] = useState(commandLineArgumentPackageName);

	// Step 2
	const [
		isScoped,
		onSetIsScoped
	] = useState(false);

	// Step 3
	const [
		authorName,
		onSetAuthorName
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
			<Box paddingBottom={1}>
				<Text>
					{'Creating React library '}
					{(packageName.length > 0) && (
						<Color green>
							{packageName}
						</Color>
					)}
				</Text>
			</Box>
			{(step === 1) && (
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
			{(step > 1) && (
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
