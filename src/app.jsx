const React = require('react')
const {string} = require('prop-types')
const {Box} = require('ink')
const onPrecheck = require('./precheck/precheck')
const importJsx = require('import-jsx')

const CollectInfo = importJsx('./collectInfo/collectInfo.jsx')
const ProjectSetup = importJsx('./projectSetup/projectSetup.jsx')

onPrecheck()

const {useState} = React

const App = ({
  packageName
}) => {
  const [configuration, onSetConfiguration] = useState({})

  return (
    <Box
      flexDirection='column'
    >
      <CollectInfo
        packageName={packageName}
        onSaveConfiguration={onSetConfiguration}
      />
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
}

module.exports = App
