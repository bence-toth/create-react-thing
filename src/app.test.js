const React = require('react');
const chalk = require('chalk');
const test = require('ava');
const {render} = require('ink-testing-library');
const App = require('./app');

test('show splash', t => {
	const {lastFrame} = render((
		<App packageName="my-library"/>
	));
	t.is(
		lastFrame(),
		chalk`Creating React library {greenBright my-library}`
	);
});
