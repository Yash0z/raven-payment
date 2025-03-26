import { AppSidebar } from "@/components/dashboard/app-sidebar/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const Dashboard: React.FC = () => {
	return (
		<main className='grid grid-cols-1 md:grid-cols-[2fr_12fr] gap-3 md:grid-areas-[sidebar_main] h-full w-full'>
			<div className='hidden md:block md:grid-in-sidebar'>
				<SidebarProvider
					style={
						{
							"--sidebar-width": "21rem",
						} as React.CSSProperties
					}
				>
					<AppSidebar className='bg-secondary/50 m-5 ' />
				</SidebarProvider>
			</div>
			<div className='md:grid-in-main h-full'>

				<span>Main</span>
			</div>
		</main>
	);
};

export default Dashboard;
