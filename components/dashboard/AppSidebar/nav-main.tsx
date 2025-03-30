"use client";

import { type Icon } from "@tabler/icons-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className='mt -10 font-cabinet-medium flex flex-col gap-2'>
				<SidebarMenu
					className='items-left flex flex-col mt-14
            '
				>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								onClick={() => {
									redirect(item.url);
								}}
								className='space-x-4 py-8 px-6  hover:border-l-2 hover:border-primary/90 hover:bg-primary/5'
							>
								{item.icon && (
									<span>
										<item.icon />
									</span>
								)}
								<span className='text-lg'>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
