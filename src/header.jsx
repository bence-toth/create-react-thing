const React = require('react')
const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')

const Header = ({
  packageName
}) => (
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
)

Header.propTypes = {
  packageName: string
}

module.exports = Header
