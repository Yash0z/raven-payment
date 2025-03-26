import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
///// LOCAL FONTS  ///////////////////////////////////////////////
import localFont from "next/font/local";
import TanstackProvider from "@/providers/TanstackProvider";

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
const zodaik_R = localFont({
	src: "../public/fonts/Zodiak-Regular.woff2",
	variable: "--font-Zodaik_R",
});
const cabinet_M = localFont({
	src: "../public/fonts/CabinetGrotesk-Medium.woff2",
	variable: "--font-Cabinet_M",
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
				className={` ${satoshi_R.variable} ${haskoy_EB.variable} ${haskoy_B.variable} 
            ${cabinet_M.variable}  ${zodaik_R.variable}
            antialiased`}
			>
				<div className='text-xl font-satoshi-medium  h-screen w-screen '>
					{" "}
					<TanstackProvider>{children}</TanstackProvider>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
