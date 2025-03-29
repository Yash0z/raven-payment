import { Metadata } from "next";
import { AppSidebar } from "@/components/dashboard/AppSidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/AppSidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant='inset' />
			<SidebarInset className='bg-background'>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
