const validateNpmPackageName = require('validate-npm-package-name');

const capitalizeString = string => {
	const firstLetter = `${string}`.charAt(0).toUpperCase();
	const rest = `${string}`.slice(1);
  return `${firstLetter}${rest}`;
};

const validatePackageName = packageName => {
	const {errors} = validateNpmPackageName(packageName);
	return errors;
};

module.exports = {
	capitalizeString,
	validatePackageName
};
