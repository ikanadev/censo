import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				".bordered": {
					"@apply border border-neutral-300 dark:border-neutral-700": {},
				},
			});
		}),
	],
}

