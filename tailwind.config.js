module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				bg: '#111111',
				card: '#ff0000',
				cardGradient: {
					start: '#ff6666',
					mid: '#ff0000',
					end: '#ff9999',
				},
				text: '#0f0f0f',
				textLight: '#333333',
				accent: '#222222',
			},
			fontFamily: {
				serif: ['Playfair Display', 'serif'],
				sans: ['Bricolage Grotesque', 'sans-serif'],
				mono: ['Space Mono', 'monospace'],
				moontime: ['MoonTime', 'serif'],
			},
		},
	},
	plugins: [],
};
