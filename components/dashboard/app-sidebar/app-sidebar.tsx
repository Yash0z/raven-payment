import * as React from "react";
import {
	Wallet,
	PiggyBank,
	ScrollText,
	ReceiptText,
	UserRound,
	BadgePercent,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar:
			"https://i.pinimg.com/236x/d9/21/4a/d9214ad661353dffe8846da342e1a004.jpg",
	},
	navMain: [
		{
			title: "Contracts",
			url: "#",
			logo: ScrollText,
		},
		{
			title: "Transactions",
			url: "#",
			logo: PiggyBank,
		},
		{
			title: "Payments",
			url: "#",
			logo: Wallet,
		},
		{
			title: "Invoices",
			url: "#",
			logo: ReceiptText,
		},
		{
			title: "Taxes",
			url: "#",
			logo: BadgePercent,
		},
		{
			title: "Contacts",
			url: "/contracts",
			logo: UserRound,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant='floating' {...props} className='h-full border-0'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<a
								href='#'
								className='flex gap-0.5 px-5 py-10 justify-left'
							>
								{/* <WalletMinimal className='size-64' />   TODO: Add this icon */}
								<div className='leading-none justify-center'>
									<span className='font-haskoy-extrabold  text-4xl'>
										Raven Inc.
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<Separator className='bg-headline/30 px-5' />
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className='gap-6 mt-20 '>
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									className='hover:bg-button/70 hover:text-main'
								>
									<a
										href={item.url}
										className='flex hover:bg-button items-center font-satoshi-medium text-[1.3rem] py-6 text-headline '
									>
										<span>
											<item.logo className='mx-4' />
										</span>
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<NavUser user={data.user} />
		</Sidebar>
	);
}
