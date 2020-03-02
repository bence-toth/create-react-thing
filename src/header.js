const React = require('react');
const {string, number} = require('prop-types');
const {Box, Text, Color} = require('ink');

const Header = ({
	step,
	packageName
}) => (
	<React.Fragment>
		<Text>Current step: {step}</Text>
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
	</React.Fragment>
);

Header.propTypes = {
	step: number,
	packageName: string
};

module.exports = Header;
