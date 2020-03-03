const React = require('react')
const {string, func, oneOf, arrayOf} = require('prop-types')
const {stepStates} = require('./enum')
const importJsx = require('import-jsx')

const InputStep = importJsx('./inputStep.jsx')

const {useState} = React

const {current} = stepStates

const KeywordsInput = ({
  onNextStep,
  state,
  keywords,
  onSetKeywords
}) => {
  const [keywordsInput, onSetKeywordsInput] = useState('')
  return (
    <InputStep
      state={state}
      label='keywords (comma-separated)'
      value={(
        (state === current)
          ? keywordsInput
          : keywords.join(', ')
      )}
      fallback='blank'
      onChange={newKeywordsValue => {
        onSetKeywordsInput(newKeywordsValue)
        onSetKeywords(newKeywordsValue
          .toLowerCase()
          .split(',')
          .map(keyword => keyword.trim())
          .filter(keyword => (keyword.length > 0))
          .filter((keyword, keywordIndex, allKeywords) => (
            allKeywords.indexOf(keyword) === keywordIndex
          )))
      }}
      onSubmit={() => {
        onNextStep()
      }}
    >
      {'Keywords help people discover your package'}
      {'as they’re listed in npm search.'}
    </InputStep>
  )
}

KeywordsInput.propTypes = {
  onNextStep: func,
  state: oneOf(Object.values(stepStates)),
  keywords: arrayOf(string),
  onSetKeywords: func
}

module.exports = KeywordsInput
