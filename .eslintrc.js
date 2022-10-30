module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['xo'],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'xo-typescript',
			],
			files: ['*.ts'],
		},
		{
			extends: ['plugin:svelte/recommended'],
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		extraFileExtensions: ['.svelte'],
	},
	rules: {
	},
};
