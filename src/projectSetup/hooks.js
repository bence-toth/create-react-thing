const shell = require('shelljs')
const React = require('react')

const {useState, useEffect} = React
const handlebars = require('handlebars')

const {licenses, codesOfConduct} = require('../enum')

const useStep = () => {
  const [
    step,
    onSetStep
  ] = useState(0)

  const onNextStep = () => onSetStep(step + 1)

  return [step, onNextStep]
}

const useStartSetup = ({
  hasConfigurationArrived,
  onNextStep
}) => {
  useEffect(() => {
    if (hasConfigurationArrived) {
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasConfigurationArrived])
}

const useCloneRepoStep = ({
  step,
  onNextStep,
  packageName
}) => {
  const [
    isGitClonePending,
    onSetIsGitClonePending
  ] = useState(false)

  useEffect(() => {
    if (step === 1) {
      // Clone GitHub repo with boilerplate
      onSetIsGitClonePending(true)
      shell.exec([
        'git clone',
        'https://github.com/bence-toth/react-library-boilerplate.git',
        packageName
      ].join(' '), {
        async: true,
        silent: true
      }, () => {
        // Finished git clone
        onSetIsGitClonePending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isGitClonePending
}

const useStartGitProject = ({
  step,
  onNextStep,
  packageName,
  gitRepoUrl
}) => {
  const [
    isGitProjectPending,
    onSetIsGitProjectPending
  ] = useState(false)

  useEffect(() => {
    if (step === 2) {
      onSetIsGitProjectPending(true)
      shell.cd(packageName)
      // Delete old git folder
      shell.rm('-rf', '.git')
      // Start new git project with git init
      shell.exec('git init', {
        async: true,
        silent: true
      }, () => {
        // Finished git init
        if (gitRepoUrl.length > 0) {
          // Add git remote if URL was provided
          shell.exec(`git remote add origin ${gitRepoUrl}.git`)
        }
        onSetIsGitProjectPending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isGitProjectPending
}

const useCreateLicense = ({
  step,
  onNextStep,
  license,
  authorName
}) => {
  const [
    isLicensePending,
    onSetIsLicensePending
  ] = useState(false)

  useEffect(() => {
    if (step === 3) {
      onSetIsLicensePending(true)
      // Delete old LICENSE file
      shell.rm('-rf', 'LICENSE')
      if (license === licenses.mit) {
        // Create MIT license file
        const templateCode = shell
          .cat(`${__dirname}/templates/licenses/mit.hbr`)
          .toString()
        const template = handlebars.compile(templateCode)
        const licenseContent = template({
          year: `${new Date().getFullYear()}`,
          copyrightOwner: authorName
        })
        const licensePath = './LICENSE'
        shell.ShellString(licenseContent).to(licensePath)
        onSetIsLicensePending(false)
        onNextStep()
      }
      else {
        onSetIsLicensePending(false)
        onNextStep()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isLicensePending
}

const useCreateCodeOfConduct = ({
  step,
  onNextStep,
  codeOfConduct,
  authorEmail
}) => {
  const [
    isCodeOfConductPending,
    onSetIsCodeOfConductPending
  ] = useState(false)

  useEffect(() => {
    if (step === 4) {
      onSetIsCodeOfConductPending(true)
      if (codeOfConduct === codesOfConduct.contributorCovenant) {
        // Create CoC file
        const templateCode = shell
          .cat(`${__dirname}/templates/codesOfConduct/contributorCovenant.hbr`)
          .toString()
        const template = handlebars.compile(templateCode)
        const codeOfConductContent = template({
          email: authorEmail
        })
        const codeOfConductPath = './code-of-conduct.md'
        shell.ShellString(codeOfConductContent).to(codeOfConductPath)
        onSetIsCodeOfConductPending(false)
        onNextStep()
      }
      else {
        onSetIsCodeOfConductPending(false)
        onNextStep()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isCodeOfConductPending
}

const useCreateReadme = ({
  step,
  onNextStep,
  packageName,
  description,
  isScoped,
  scopeName,
  codeOfConduct,
  license
}) => {
  const [
    isReadmePending,
    onSetIsReadmePending
  ] = useState(false)

  useEffect(() => {
    if (step === 5) {
      onSetIsReadmePending(true)
      const templateCode = shell
        .cat(`${__dirname}/templates/readme.hbr`)
        .toString()
      const availableScripts = shell
        .cat('./README.md')
        .toString()
      const template = handlebars.compile(templateCode, {noEscape: true})
      const readmeContent = template({
        packageName,
        hasDescription: description.length > 0,
        description,
        fullPackageName: (
          isScoped
            ? `${scopeName}/${packageName}`
            : packageName
        ),
        hasCodeOfConduct: codeOfConduct !== null,
        availableScripts,
        hasLicense: license !== null,
        license
      })
      const readmePath = './README.md'
      shell.ShellString(readmeContent).to(readmePath)
      onSetIsReadmePending(false)
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isReadmePending
}

const useUpdatePackageJson = ({
  step,
  onNextStep,
  isScoped,
  scopeName,
  packageName,
  description,
  keywords,
  license,
  authorName,
  authorEmail,
  authorWebsite,
  gitRepoUrl
}) => {
  const [
    isPackageJsonPending,
    onSetIsPackageJsonPending
  ] = useState(false)

  useEffect(() => {
    if (step === 6) {
      onSetIsPackageJsonPending(true)
      const packageJsonPath = './package.json'
      const {
        scripts,
        files,
        main,
        devDependencies,
        peerDependencies,
        dependencies
      } = JSON.parse((
        shell
          .cat(packageJsonPath)
          .toString()
      ))
      const updatedPackageObject = {
        name: (
          isScoped
            ? `${scopeName}/${packageName}`
            : packageName
        ),
        version: '1.0.0',
        ...(
          (description.length > 0)
            ? {description}
            : {}
        ),
        ...(
          (keywords.length > 0)
            ? {keywords}
            : {}
        ),
        ...(
          (license === licenses.mit)
            ? {license: 'MIT'}
            : {}
        ),
        scripts,
        author: {
          name: authorName,
          ...(
            (authorEmail.length > 0)
              ? {email: authorEmail}
              : {}
          ),
          ...(
            (authorWebsite.length > 0)
              ? {url: authorWebsite}
              : {}
          )
        },
        ...(
          (gitRepoUrl.length > 0)
            ? {
              homepage: `${gitRepoUrl}#readme`,
              repository: {
                type: 'git',
                url: `${gitRepoUrl}.git`
              },
              bugs: {
                url: `${gitRepoUrl}/issues`
              }
            }
            : {}
        ),
        dependencies,
        peerDependencies,
        devDependencies,
        main,
        files
      }
      shell
        .ShellString(JSON.stringify(updatedPackageObject, null, 2))
        .to(packageJsonPath)
      onSetIsPackageJsonPending(false)
      onNextStep()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isPackageJsonPending
}

const useInstallPackages = ({
  step,
  onNextStep
}) => {
  const [
    isNpmInstallPending,
    onSetIsNpmInstallPending
  ] = useState(false)

  useEffect(() => {
    if (step === 7) {
      onSetIsNpmInstallPending(true)
      shell.exec('npm install', {
        async: true,
        silent: true
      }, () => {
        // Finished npm install
        onSetIsNpmInstallPending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isNpmInstallPending
}

const useCreateGitCommit = ({
  step,
  onNextStep
}) => {
  const [
    isGitCommitPending,
    onSetIsGitCommitPending
  ] = useState(false)

  useEffect(() => {
    if (step === 8) {
      onSetIsGitCommitPending(true)
      shell.exec('git add -A', {silent: true})
      shell.exec('git commit -m "Initial commit"', {
        async: true,
        silent: true
      }, () => {
        // Finished npm install
        onSetIsGitCommitPending(false)
        onNextStep()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return isGitCommitPending
}

module.exports = {
  useStep,
  useStartSetup,
  useCloneRepoStep,
  useStartGitProject,
  useCreateLicense,
  useCreateCodeOfConduct,
  useCreateReadme,
  useUpdatePackageJson,
  useInstallPackages,
  useCreateGitCommit
}
