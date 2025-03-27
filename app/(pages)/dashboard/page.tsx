import { AppSidebar } from "@/components/dashboard/AppSidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/AppSidebar/site-header";
import { Box } from "@/components/dashboard/Main/header/box";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
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
				<main className='h-full bg-background grid grid-rows-[3fr_2fr_4fr] rows-[header_main_footer] '>
					<div className='row-in-header grid grid-cols-[2fr_4fr] cols-[left_right]'>
						<div className='cols-in-left p-4'>
							<Box />
						</div>
						<div className='col-in-Right'></div>
					</div>
					<div className='row-in-main'> </div>
					<div className='row-in-footer'></div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
