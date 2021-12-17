const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withTM = require('next-transpile-modules')([
	'react-markdown',
]);

module.exports = {
	reactStrictMode : true,
};

module.exports = withTM({});
