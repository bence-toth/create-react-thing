const React = require('react')

const {string} = require('prop-types')
const {Box, Text, Color} = require('ink')

const Intro = ({
  packageName,
  fullPackageName,
  folderPath
}) => (
  <Box
    flexDirection='column'
    paddingTop={1}
    paddingX={2}
  >
    <Box flexDirection='column'>
      <Text>
        {'Successfully created '}
        <Color greenBright>{fullPackageName}</Color>
        {' at '}
        <Color blueBright>{folderPath}</Color>
        {'.\n'}
      </Text>
      <Text>
        {'Inside that directory, you can run several commands,\n'}
        {'for example:'}
      </Text>
    </Box>
    <Box paddingLeft={2} flexDirection='column' paddingTop={1}>
      <Box paddingBottom={1}>
        <Text>
          <Color blueBright>npm start</Color>
          {'     - '}
          Starts Storybook
        </Text>
      </Box>
      <Box paddingBottom={1}>
        <Text>
          <Color blueBright>npm test</Color>
          {'      - '}
          Runs unit, integration and snapshot tests
        </Text>
      </Box>
      <Box paddingBottom={1}>
        <Text>
          <Color blueBright>npm run build</Color>
          {' - '}
          Generates package bundle
        </Text>
      </Box>
    </Box>
    <Box
      flexDirection='column'
      paddingTop={1}
    >
      <Box>
        <Text>We suggest that you begin by typing:</Text>
      </Box>
      <Box
        paddingLeft={2}
        paddingY={1}
        flexDirection='column'
      >
        <Box>
          <Text>
            <Color blueBright>
              {'cd '}
              {packageName}
            </Color>
          </Text>
        </Box>
        <Box>
          <Text>
            <Color blueBright>
              npm start
            </Color>
          </Text>
        </Box>
      </Box>
    </Box>
    <Box
      flexDirection='column'
      paddingTop={1}
    >
      <Box>
        <Text>{'Read the “Contributing” section of the readme file\nfor more details:'}</Text>
      </Box>
      <Box
        paddingLeft={2}
        paddingY={1}
        flexDirection='column'
      >
        <Text>
          <Color blueBright>
            {`${folderPath}/README.md`}
          </Color>
        </Text>
      </Box>
    </Box>
    <Box paddingY={1}>
      <Text>
        <Color redBright>♥</Color>
        {' Happy creating!'}
      </Text>
    </Box>
  </Box>
)

Intro.propTypes = {
  packageName: string,
  fullPackageName: string,
  folderPath: string
}

module.exports = Intro
