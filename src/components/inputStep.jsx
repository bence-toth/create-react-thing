const React = require('react')
const {string, func, oneOf, oneOfType, bool, node} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {default: Input} = require('ink-text-input')
const {stepStates} = require('../enum')
const {indentStepHint} = require('./utility')
const importJsx = require('import-jsx')

const ValidationError = importJsx('./validationError.jsx')

const {current, completed} = stepStates

const InputStep = ({
  state,
  label,
  value,
  fallback,
  onChange,
  onSubmit,
  validationError,
  children
}) => (
  <>
    {(state === current) && (
      <Box flexDirection='column'>
        <Box flexDirection='row'>
          <Text>- </Text>
          <Text bold>{`${label}: `}</Text>
          <Input
            value={value}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </Box>
        {validationError && (
          <ValidationError>
            {validationError}
          </ValidationError>
        )}
        {children && (
        <Box
          flexDirection='row'
          paddingTop={1}
        >
          <Text>
            <Color bgKeyword='blue'>
              (ℹ)
            </Color>
          </Text>
          <Text>
            {indentStepHint(children)}
          </Text>
        </Box>
        )}
      </Box>
    )}
    {(state === completed) && (
      <Box flexDirection='row'>
        <Text>
          <Color greenBright>
            {'✓ '}
          </Color>
        </Text>
        <Text>{`${label}: `}</Text>
        <Text>
          {((value.length > 0)
            ? (
              <Color blueBright>
                {value}
              </Color>
            )
            : (
              <Color gray>
                {fallback}
              </Color>
            ))}
        </Text>
      </Box>
    )}
  </>
)

InputStep.propTypes = {
  state: oneOf(Object.values(stepStates)),
  label: string,
  value: string,
  fallback: string,
  onChange: func,
  onSubmit: func,
  validationError: oneOfType([string, bool]),
  children: node
}

module.exports = InputStep
