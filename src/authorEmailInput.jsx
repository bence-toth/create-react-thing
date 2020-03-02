const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {validateAuthorEmail} = require('./utility')
const {stepStates} = require('./enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('./inputStep.jsx')

const {useEffect, useState} = React

const {current} = stepStates

const AuthorEmailInput = ({
  onNextStep,
  state,
  authorEmail,
  onSetAuthorEmail
}) => {
  const [isDirty, onSetIsDirty] = useState(false)
  useEffect(() => {
    if (state === current) {
      onSetIsDirty(false)
    }
  }, [state])
  const [validationErrors, onSetValidationErrors] = useState()
  useEffect(() => {
    onSetValidationErrors(validateAuthorEmail(authorEmail))
  }, [authorEmail])
  return (
    <InputStep
      state={state}
      label='Author email address'
      fallback='blank'
      value={authorEmail}
      validationError={(isDirty && validationErrors && (authorEmail.length > 0)) && (
        validationErrors[0]
      )}
      onChange={onSetAuthorEmail}
      onSubmit={() => {
        onSetIsDirty(true)
        if (!validationErrors || (authorEmail.length === 0)) {
          onNextStep()
        }
      }}
    >
      {'This is used to fill in the `author` field in the `package.json` file.'}
      {'This field is optional.'}
      {''}
      {'Read more about it here:'}
      {'https://docs.npmjs.com/files/package.json#people-fields-author-contributors'}
    </InputStep>
  )
}

AuthorEmailInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  authorEmail: string,
  onSetAuthorEmail: func
}

module.exports = AuthorEmailInput
