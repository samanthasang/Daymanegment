import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import path from "path";

const withSerwist = withSerwistInit({
	swSrc: "src/sw.ts",
	swDest: path.join(process.cwd(), "public/sw.js"),
	// This ensures Serwist doesn't try to use experimental turbo features during build
	disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
	output: "export",
	images: { unoptimized: true },
	reactStrictMode: true,
	basePath: "/Daymanegment",
	assetPrefix: "/Daymanegment/",

	// Adding an empty turbopack config often silences the "no turbopack config" error
	turbopack: {},
};

export default withSerwist(nextConfig);
