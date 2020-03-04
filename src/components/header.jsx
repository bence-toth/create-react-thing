const React = require('react')
const {string, bool, oneOfType} = require('prop-types')
const {Box, Text, Color} = require('ink')

const Header = ({
  packageName,
  scopeName
}) => {
  const fullPackageName = (
    (scopeName && (scopeName.length > 0))
      ? `${scopeName}/${packageName}`
      : packageName
  )
  return (
    <Box paddingBottom={1}>
      <Text>
        {'Creating React library '}
        {(fullPackageName.length > 0) && (
        <Color greenBright>
          {fullPackageName}
        </Color>
        )}
      </Text>
    </Box>
  )
}

Header.propTypes = {
  packageName: string.isRequired,
  scopeName: oneOfType([string, bool])
}

module.exports = Header
