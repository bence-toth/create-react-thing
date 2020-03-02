const React = require('react');
const chalk = require('chalk');
const test = require('ava');
const {render} = require('ink-testing-library');
const App = require('./ui');

test('show splash', t => {
	const {lastFrame} = render((
		<App packageName="my-app"/>
	));
	t.is(
		lastFrame(),
		chalk`Creating React library {green my-app}`
	);
});
