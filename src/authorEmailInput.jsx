const React = require('react')
const {bool, string, func, oneOf} = require('prop-types')
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
  onSetAuthorEmail,
  isRequiredForCodeOfConduct
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
      label='author email address'
      fallback='blank'
      value={authorEmail}
      validationError={isDirty && (() => {
        if (validationErrors && (authorEmail.length > 0)) {
          return validationErrors[0]
        }
        if (isRequiredForCodeOfConduct && (authorEmail.length === 0)) {
          return 'Author email is required for the code of conduct'
        }
        return null
      })()}
      onChange={onSetAuthorEmail}
      onSubmit={() => {
        onSetIsDirty(true)
        const isNotRequiredAndBlank =
          !isRequiredForCodeOfConduct && (authorEmail.length === 0)
        const isValid = !validationErrors
        if (isNotRequiredAndBlank || isValid) {
          onNextStep()
        }
      }}
    >
      {'This is used to fill in the `author` field in the `package.json` file.'}
      {(
        isRequiredForCodeOfConduct
          ? 'This will also be used in the code of conduct.'
          : 'This field is optional.'
      )}
      {''}
      {'Read more here:'}
      {'https://docs.npmjs.com/files/package.json#people-fields-author-contributors'}
    </InputStep>
  )
}

AuthorEmailInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  authorEmail: string,
  onSetAuthorEmail: func,
  isRequiredForCodeOfConduct: bool
}

module.exports = AuthorEmailInput
