const React = require('react')
const {string, func, oneOf} = require('prop-types')
const {validateAuthorWebsite} = require('./utility')
const {stepStates} = require('./enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('./inputStep.jsx')

const {useEffect, useState} = React

const {current} = stepStates

const AuthorWebsiteInput = ({
  onNextStep,
  state,
  authorWebsite,
  onSetAuthorWebsite
}) => {
  const [isDirty, onSetIsDirty] = useState(false)
  useEffect(() => {
    if (state === current) {
      onSetIsDirty(false)
    }
  }, [state])
  const [validationErrors, onSetValidationErrors] = useState()
  useEffect(() => {
    onSetValidationErrors(validateAuthorWebsite(authorWebsite))
  }, [authorWebsite])
  return (
    <InputStep
      state={state}
      label='Author website'
      fallback='blank'
      value={authorWebsite}
      validationError={(isDirty && validationErrors && (authorWebsite.length > 0)) && (
        validationErrors[0]
      )}
      onChange={onSetAuthorWebsite}
      onSubmit={() => {
        onSetIsDirty(true)
        if (!validationErrors || (authorWebsite.length === 0)) {
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

AuthorWebsiteInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  authorWebsite: string,
  onSetAuthorWebsite: func
}

module.exports = AuthorWebsiteInput
