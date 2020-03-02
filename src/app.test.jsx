const React = require('react')
const chalk = require('chalk')
const test = require('ava')
const {render} = require('ink-testing-library')
const App = require('./app')

test('show splash', () => new Promise(testCase => {
  const {lastFrame} = render((
    <App
      packageName='my-library'
    />
  ))
  testCase.is(
    lastFrame(),
    chalk`Creating React library {greenBright my-library}`
  )
}))
