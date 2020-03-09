const React = require('react')
const {string} = require('prop-types')
const {Box} = require('ink')
const onPrecheck = require('./precheck/precheck')
const importJsx = require('import-jsx')

const CollectInfo = importJsx('./collectInfo/collectInfo.jsx')
const ProjectSetup = importJsx('./projectSetup/projectSetup.jsx')
const Intro = importJsx('./intro/intro.jsx')

onPrecheck()

const {useState} = React

const App = ({
  packageName
}) => {
  const [configuration, onSetConfiguration] = useState({})

  const [isFinished, onSetIsFinished] = useState(false)
  const onHasFinished = () => {
    onSetIsFinished(true)
  }

  return (
    <Box
      flexDirection='column'
    >
      {!isFinished && (
        <>
          <CollectInfo
            packageName={packageName}
            onSaveConfiguration={onSetConfiguration}
          />
          {(Object.keys(configuration).length > 0) && (
            <ProjectSetup
              configuration={configuration}
              onHasFinished={onHasFinished}
            />
          )}
        </>
      )}
      {isFinished && (
        <Intro
          packageName='asd'
          fullPackageName='@asd/asd'
          folderPath='/home/user/repos/temp/asd'
        />
      )}
    </Box>
  )
}

App.propTypes = {
  packageName: string
}

module.exports = App
