const React = require('react');
const chalk = require('chalk');
const test = require('ava');
const {render} = require('ink-testing-library');
const App = require('./ui');

test('greet unknown user', t => {
	const {lastFrame} = render((
		<App/>
	));
	t.is(
		lastFrame(),
		chalk`Hello, {green Stranger}`
	);
});

test('greet user with a name', t => {
	const {lastFrame} = render((
		<App name="Jane"/>
	));
	t.is(
		lastFrame(),
		chalk`Hello, {green Jane}`
	);
});
