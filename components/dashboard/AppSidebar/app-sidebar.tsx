"use client";

import * as React from "react";
import {
	IconBuildingBank,
	IconCamera,
	IconContract,
	IconCurrencyRupee,
	IconFileAi,
	IconFileDescription,
	IconHelp,
	IconLayoutDashboardFilled,
	IconLogs,
	IconSettings,
	IconSignature,
	IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/dashboard/AppSidebar/nav-main";
import { NavSecondary } from "@/components/dashboard/AppSidebar/nav-secondary";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useHydrateUser } from "@/hooks/user/hydrate.user";
import { NavUser } from "./nav-user";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: IconLayoutDashboardFilled,
		},
		{
			title: "My Contracts",
			url: "/my-contract",
			icon: IconLogs,
		},
		{
			title: "Contracts",
			url: "/contract",
			icon: IconContract,
		},
		{
			title: "Approvals",
			url: "/approvals",
			icon: IconSignature,
		},
		{
			title: "Payments",
			url: "/payment",
			icon: IconBuildingBank,
		},
		{
			title: "Transactions",
			url: "/transaction",
			icon: IconCurrencyRupee,
		},
		{
			title: "Contacts",
			url: "/contacts",
			icon: IconUsers,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: IconCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: IconFileAi,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: IconSettings,
		},
		{
			title: "privacy",
			url: "#",
			icon: IconHelp,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	useHydrateUser();
	const [user] = useAtom(userAtom);
	return (
		<Sidebar collapsible='offcanvas' {...props}>
			<SidebarHeader className='pt-6.5 '>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className='data-[slot=sidebar-menu-button]:!py-5 flex justify-center hover:bg-sidebar '
						>
							<a href='#'>
								<span className='text-3xl md:text-4xl p-5 font-haskoy-extrabold text-sidebar-primary'>
									Escrowly
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className='flex flex-col'>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
