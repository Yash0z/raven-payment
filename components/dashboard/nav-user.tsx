"use client";

import {
	IconCreditCard,
	IconDotsVertical,
	IconLogout,
	IconNotification,
	IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { LogOut } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const router = useRouter();
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const logout = async () => {
		setIsLoading(true);
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						toast("Signed Out successfully");
						router.push("/sign-in");
					},
				},
			});
		} catch (error) {
			toast.error("Logout failed. Please try again.");
			setIsLoading(false);
			setIsAlertOpen(true);
		} finally {
			// This ensures the loading state is reset even if an error occurs
			setIsLoading(false);
		}
	};
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg grayscale'>
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className='rounded-lg'>
										CN
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>
										{user.name}
									</span>
									<span className='text-zinc-500 truncate text-xs dark:text-zinc-400'>
										{user.email}
									</span>
								</div>
								<IconDotsVertical className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
							side={isMobile ? "bottom" : "right"}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback className='rounded-lg'>
											CN
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-medium'>
											{user.name}
										</span>
										<span className='text-zinc-500 truncate text-xs dark:text-zinc-400'>
											{user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<IconUserCircle />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<IconCreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<IconNotification />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									onSelect={(e) => {
										e.preventDefault();
										setIsAlertOpen(true);
									}}
								>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</AlertDialogTrigger>
						</DropdownMenuContent>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you sure you want to Log out ?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This will log you out of your account.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel disabled={isLoading}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={logout}
									disabled={isLoading}
								>
									{isLoading ? "Logging out..." : "Continue"}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</DropdownMenu>
				</AlertDialog>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
