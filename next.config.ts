import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export", // Required for Cloudflare Pages static exports
	// This is needed if you're using the App Router
	images: {
		unoptimized: true,
	},
	// We need to disable this since we're not using Pages Functions

	appDir: true,
};

export default nextConfig;
