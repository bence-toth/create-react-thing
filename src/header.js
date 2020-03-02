const React = require('react');
const {string, number} = require('prop-types');
const {Box, Text, Color} = require('ink');

const Header = ({
	step,
	packageName
}) => (
	<>
		<Text>Current step: {step}</Text>
		<Box paddingBottom={1}>
			<Text>
				{'Creating React library '}
				{(packageName.length > 0) && (
					<Color greenBright>
						{packageName}
					</Color>
				)}
			</Text>
		</Box>
	</>
);

Header.propTypes = {
	step: number,
	packageName: string
};

module.exports = Header;
