const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
	addBabelPlugin([
		'babel-plugin-root-import',
		{
			rootPathSuffix: 'src',
		},
	]),
	addBabelPlugin([
		'import',
		{ libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
	])
);
