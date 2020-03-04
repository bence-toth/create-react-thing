/* eslint-disable react/jsx-props-no-spreading */
const React = require('react')

const {string, bool} = require('prop-types')
const {Box, Text, Color} = require('ink')
const {default: Spinner} = require('ink-spinner')

const Task = ({
  isPending,
  label
}) => (
  <Box>
    <Text>
      {(
        isPending
          ? (
            <Color white>
              <Spinner />
              {' '}
            </Color>
          )
          : (
            <Text>
              <Color greenBright>
                {'✓ '}
              </Color>
            </Text>
          )
      )}
    </Text>
    <Text>
      {label}
    </Text>
  </Box>
)

Task.propTypes = {
  isPending: bool,
  label: string
}

module.exports = Task
