const validateNpmPackageName = require('validate-npm-package-name');

const capitalizeString = string => {
	const firstLetter = `${string}`.charAt(0).toUpperCase();
	const rest = `${string}`.slice(1);
  return `${firstLetter}${rest}`;
};

const validatePackageName = packageName => {
	const {errors} = validateNpmPackageName(packageName);
	return (
		errors
			? errors.map(capitalizeString)
			: undefined
	)
};

const validateScopeName = packageName => {
	const {errors: npmErrors} = validatePackageName(packageName) || []
	const errors = [
		...(
			(packageName && (packageName.charAt(0) !== '@'))
				? (['Name must start with an @'])
				: []
		),
		...(
			(packageName && packageName.includes('/'))
				? (['Name must not contain a slash'])
				: []
		),
		...(npmErrors || [])
	]
	return (
		(errors.length > 0)
			? errors
			: undefined
	)
}

module.exports = {
	validatePackageName,
	validateScopeName
};
