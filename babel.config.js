module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				root: ['./src'],
				alias: [
					{
						'Pages/*': './Pages/*',
						'Assets/*': './Assets/*',
						'Components/*': './Components/*',
						'Routes/*': './Routes/*',
						'Navigations/*': './Navigations/*',
					},
				],
				extensions: ['.tsx', '.ts', '.js', '.json', '.txt'],
			},
		],
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blocklist: null,
				allowlist: ['URL_PROD', 'GOOGLE_MAPS'],
				safe: false,
				allowUndefined: true,
			},
		],
		'babel-plugin-styled-components',
		'react-native-reanimated/plugin',
	],
	env: {
		production: {
			plugins: ['react-native-paper/babel'],
		},
	},
};
