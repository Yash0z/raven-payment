"use client";
import { type Icon } from "@tabler/icons-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
}) {
	const router = useRouter();
	const pathname = usePathname(); // Get current path

	return (
		<SidebarGroup>
			<SidebarGroupContent className='mt-10 font-cabinet-medium flex flex-col gap-2'>
				<SidebarMenu className='items-left flex flex-col mt-14'>
					{items.map((item) => {
						const isActive = pathname === item.url;

						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									tooltip={item.title}
									onClick={() => {
										router.push(item.url);
									}}
									className={`space-x-4 py-8 px-6 
                    ${
								isActive
									? "border-l-2 border-primary/90 bg-primary/10"
									: "hover:border-l-2 hover:border-primary/90 hover:bg-primary/5"
							}`}
								>
									{item.icon && (
										<span className={isActive ? "text-primary" : ""}>
											<item.icon />
										</span>
									)}
									<span
										className={`text-lg ${
											isActive ? "font-medium text-primary" : ""
										}`}
									>
										{item.title}
									</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
