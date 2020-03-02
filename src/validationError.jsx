const React = require('react')
const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')

const ValidationError = ({
  children
}) => (
  <Box paddingTop={1}>
    <Text>
      <Color bgKeyword='red'>
        [!]
      </Color>
      {' '}
      {children}
    </Text>
  </Box>
)

ValidationError.propTypes = {
  children: string
}

module.exports = ValidationError
