const React = require('react');
const {string} = require('prop-types');
const {Text, Color} = require('ink');

const App = ({name}) => (
	<Text>
		Hello, <Color green>{name}</Color>
	</Text>
);

App.propTypes = {
	name: string
};

App.defaultProps = {
	name: 'Stranger'
};

module.exports = App;
