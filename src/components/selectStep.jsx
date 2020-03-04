const React = require('react')
const {number, bool, func, oneOf, node, string, oneOfType, arrayOf, shape} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {stepStates} = require('../enum')
const {indentStepHint} = require('./utility')
const importJsx = require('import-jsx')

const Select = importJsx('./select.jsx')

const {current, completed} = stepStates

const SelectStep = ({
  state,
  label,
  value,
  options,
  onChange,
  onSubmit,
  children
}) => (
  <>
    {(state === current) && (
      <Box flexDirection='column'>
        <Box flexDirection='row'>
          <Text>- </Text>
          <Text bold>{label}</Text>
        </Box>
        <Box
          paddingTop={1}
          paddingLeft={2}
        >
          <Select
            options={options}
            value={value}
            onChange={onChange}
            onSelect={onSubmit}
          />
        </Box>
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
      </Box>
    )}
    {(state === completed) && (
      <Box flexDirection='row'>
        <Text>
          <Color greenBright>
            {'✓ '}
          </Color>
        </Text>
        <Text>{label}</Text>
        {' '}
        <Text>
          <Color blueBright>
            {options.find(option => (option.value === value)).label}
          </Color>
        </Text>
      </Box>
    )}
  </>
)

SelectStep.propTypes = {
  state: oneOf(Object.values(stepStates)),
  label: string,
  value: oneOfType([number, bool, string]),
  options: arrayOf(shape({
    value: oneOfType([number, bool, string]),
    label: string
  })),
  onChange: func,
  onSubmit: func,
  children: node
}

module.exports = SelectStep
