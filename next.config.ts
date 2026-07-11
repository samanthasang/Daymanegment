// next.config.ts
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
});
const nextConfig: NextConfig = {
	output: "export",
	// If you use next/image, you also need to disable default image optimization:
	images: { unoptimized: true },
	reactStrictMode: true,

	async headers() {
		return [
			{
				source: "/sw.js",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=0, must-revalidate",
					},
				],
			},
		];
	},
};

export default withSerwist(nextConfig);
