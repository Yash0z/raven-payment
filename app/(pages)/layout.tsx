import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | home",
		default: "raven inc",
	},
};

export default async function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
