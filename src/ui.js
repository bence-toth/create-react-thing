const React = require('react');
const {string, object} = require('prop-types');
const {Box, Text, Color} = require('ink');

const App = ({packageName, flags}) => (
	<Box flexDirection="column">
		<Text>
			{'Creating React library '}
			<Color green>{packageName}</Color>
		</Text>
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

App.propTypes = {
	packageName: string,
	flags: object
};

App.defaultProps = {
	flags: {}
};

module.exports = App;
