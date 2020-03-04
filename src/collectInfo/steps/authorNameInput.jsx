const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {validateAuthorName} = require('./utility')
const {stepStates} = require('../../enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('../../components/inputStep.jsx')

const {useEffect, useState} = React

const {current} = stepStates

const AuthorNameInput = ({
  onNextStep,
  state,
  authorName,
  onSetAuthorName
}) => {
  const [isDirty, onSetIsDirty] = useState(false)
  useEffect(() => {
    if (state === current) {
      onSetIsDirty(false)
    }
  }, [state])
  const [validationErrors, onSetValidationErrors] = useState()
  useEffect(() => {
    onSetValidationErrors(validateAuthorName(authorName))
  }, [authorName])
  return (
    <InputStep
      state={state}
      label='author name'
      value={authorName}
      validationError={(isDirty && validationErrors) && (
        validationErrors[0]
      )}
      onChange={onSetAuthorName}
      onSubmit={() => {
        onSetIsDirty(true)
        if (!validationErrors) {
          onNextStep()
        }
      }}
    >
      {'This is used to fill in the `author` field in the `package.json` file.'}
      {''}
      {'Read more here:'}
      {'https://docs.npmjs.com/files/package.json#people-fields-author-contributors'}
    </InputStep>
  )
}

AuthorNameInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  authorName: string,
  onSetAuthorName: func
}

module.exports = AuthorNameInput
