const indentStepHint = lines => (
  lines
    .map((line, lineIndex) => {
      if (lineIndex === 0) {
        return ` ${line}`
      }
      return `    ${line}`
    })
    .join('\n')
)

module.exports = {
  indentStepHint
}
