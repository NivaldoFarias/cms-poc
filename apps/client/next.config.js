/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextSafe = require("next-safe");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
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
