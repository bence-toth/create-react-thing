const React = require('react')

const {useState} = React
const {string} = require('prop-types')
const {Box} = require('ink')
const importJsx = require('import-jsx')

const CollectInfo = importJsx('./collectInfo/collectInfo.jsx')
const ProjectSetup = importJsx('./projectSetup/projectSetup.jsx')

const App = ({
  packageName
}) => {
  const [configuration, onSetConfiguration] = useState({})

  return (
    <Box
      flexDirection='column'
    >
      {(Object.keys(configuration).length === 0) && (
        <CollectInfo
          packageName={packageName}
          onSaveConfiguration={onSetConfiguration}
        />
      )}
      {(Object.keys(configuration).length > 0) && (
        <ProjectSetup
          configuration={configuration}
        />
      )}
    </Box>
  )
}

App.propTypes = {
  packageName: string
  // TODO: flags: object
}

App.defaultProps = {
  // TODO: flags: {}
}

module.exports = App
