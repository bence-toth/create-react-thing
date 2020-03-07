const validateNpmPackageName = require('validate-npm-package-name')

const capitalizeString = string => {
  const firstLetter = `${string}`.charAt(0).toUpperCase()
  const rest = `${string}`.slice(1)
  return `${firstLetter}${rest}`
}

const validatePackageName = packageName => {
  const {errors} = validateNpmPackageName(packageName)
  return (
    errors
      ? errors.map(capitalizeString)
      : undefined
  )
}

const validateScopeName = packageName => {
  const {errors: npmErrors} = validateNpmPackageName(packageName.slice(1))
  const updatedNpmErrors = npmErrors && npmErrors.map(error => {
    if (error === 'name length must be greater than zero') {
      return 'name length must be greater than one'
    }

    return error
  })
  const errors = [
    ...(
      (packageName.length === 0)
        ? ['name length must be greater than zero']
        : []
    ),
    ...(
      (packageName && (packageName.charAt(0) !== '@'))
        ? (['name must start with an @'])
        : []
    ),
    ...(
      (packageName && packageName.includes('/'))
        ? (['name must not contain a /'])
        : []
    ),
    ...(updatedNpmErrors || [])
  ]
  return (
    (errors.length > 0)
      ? errors.map(capitalizeString)
      : undefined
  )
}

const validateGitRepoUrl = url => {
  // Must be like: `https://github.com/{USERNAME}/{REPO}`
  const gitHubRepoRegex = (
    // eslint-disable-next-line optimize-regex/optimize-regex, unicorn/regex-shorthand
    /^https:\/\/github\.com\/([\w\d-_]+)\/([\w\d-_]+)(\/?)$/
  )
  if (!gitHubRepoRegex.test(url)) {
    return [
      'This does not look like a valid GitHub repository URL'
    ]
  }
  return undefined
}

const validateAuthorName = authorName => {
  if (authorName.length === 0) {
    return [
      'Author name must not be blank'
    ]
  }
  return undefined
}

const validateAuthorEmail = authorEmail => {
  const emailRegex = (
    // eslint-disable-next-line optimize-regex/optimize-regex, unicorn/regex-shorthand
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  )
  if (!emailRegex.test(authorEmail)) {
    return [
      'This does not look like a valid email address'
    ]
  }
  return undefined
}

const validateAuthorWebsite = authorEmail => {
  const urlRegex = (
    // eslint-disable-next-line optimize-regex/optimize-regex, unicorn/regex-shorthand, no-useless-escape
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  )
  if (!urlRegex.test(authorEmail)) {
    return [
      'This does not look like a valid URL'
    ]
  }
  return undefined
}

module.exports = {
  validatePackageName,
  validateScopeName,
  validateGitRepoUrl,
  validateAuthorName,
  validateAuthorEmail,
  validateAuthorWebsite
}
