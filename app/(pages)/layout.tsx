import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "Home",
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
