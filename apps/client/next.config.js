/** @type {import('next').NextConfig} */
// @ts-check

/* 
eslint-disable 
@typescript-eslint/no-var-requires, 
@typescript-eslint/ban-ts-comment 
*/

/** @type {import('./types/next-safe')} */
// @ts-ignore
const nextSafe = require("next-safe");

/** @type {import('./types/next-pwa')} */
// @ts-ignore
const pluginPWA = require("next-pwa");
const withPWA = pluginPWA({
	dest: "public",
});

module.exports = withPWA({
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	typescript: {
		// ! Dangerously allow production builds to successfully complete even if your project has type errors.
		ignoreBuildErrors: true,
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: nextSafe({
					isDev: process.env.NODE_ENV !== "production",
					contentSecurityPolicy: {
						"img-src": ["'self'", "https://www.w3.org/2000/svg", "data:"],
						"script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
					},
				}),
			},
		];
	},
});
