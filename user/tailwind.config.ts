import type { Config } from "tailwindcss";

const config: Config = {
	theme: {
		extend: {
			fontFamily: {
				heading: ["var(--font-heading)"],
				body: ["var(--font-body)"],
			},
		},
	},
};

export default config;
