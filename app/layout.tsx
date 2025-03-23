import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
///// LOCAL FONTS  ///////////////////////////////////////////////
import localFont from "next/font/local";

const haskoy_B = localFont({
	src: "../public/fonts/Haskoy-Bold.woff2",
	variable: "--font-Haskoy_B",
});

const haskoy_EB = localFont({
	src: "../public/fonts/Haskoy-ExtraBold.woff2",
	variable: "--font-Haskoy_EB",
});
const satoshi_R = localFont({
	src: "../public/fonts/Satoshi-Regular.woff2",
	variable: "--font-Satoshi_R",
});
const satoshi_M = localFont({
	src: "../public/fonts/Satoshi-Medium.woff2",
	variable: "--font-Satoshi_M",
});
////////////////////////////////////////////////////////////////

export const metadata: Metadata = {
	title: "",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${satoshi_M.variable} ${satoshi_R.variable} ${haskoy_EB.variable} ${haskoy_B.variable} antialiased`}
			>
				<div className='text-xl font-satoshi-medium  h-screen w-screen p-2.5 '>
					{" "}
					{children}
				</div>
				<Toaster />
			</body>
		</html>
	);
}
