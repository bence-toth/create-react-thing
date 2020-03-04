const React = require('react')
const {arrayOf, shape, oneOfType, string, number, bool, func} = require('prop-types')
const {Box, Text, Color, useInput} = require('ink')

const Select = ({
  options,
  value,
  onChange,
  onSelect
}) => {
  useInput((_, key) => {
    if (key.downArrow) {
      const currentIndex = options
        .findIndex(({value: optionValue}) => value === optionValue)
      if ((currentIndex + 1) === options.length) {
        onChange(options[0].value)
      }
      else {
        onChange(options[currentIndex + 1].value)
      }
    }

    if (key.upArrow) {
      const currentIndex = options
        .findIndex(({
          value: optionValue
        }) => value === optionValue)
      if (currentIndex === 0) {
        onChange(options[options.length - 1].value)
      }
      else {
        onChange(options[currentIndex - 1].value)
      }
    }

    if (key.return) {
      onSelect(value)
    }
  })
  return (
    <Box flexDirection='column'>
      {options.map(option => (
        <Box
          key={option.value}
          flexDirection='row'
        >
          <Text>
            <Color blueBright>
              {(value === option.value) ? 'ᐳ' : ' '}
            </Color>
            {' '}
          </Text>
          <Text bold>{option.label}</Text>
        </Box>
      ))}
    </Box>
  )
}

Select.propTypes = {
  options: arrayOf(shape({
    label: string,
    value: oneOfType([string, bool, number])
  })),
  value: oneOfType([string, bool, number]),
  onChange: func,
  onSelect: func
}

module.exports = Select
