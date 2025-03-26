"use client";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	Loader2,
	LogOut,
	Sparkles,
} from "lucide-react";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
	const { isMobile } = useSidebar();
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

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild className='bg-secondary'>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-highlight/80 data-[state=open]:text-main px-3 py-10'
							>
								<Avatar className='h-12 w-auto rounded-sm mr-2'>
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className='rounded-lg'>
										CN
									</AvatarFallback>
								</Avatar>
								<div className='flex flex-col justify-between text-left text-lg leading-tight'>
									<span className='truncate font-semibold'>
										{user.name}
									</span>
									<span className='truncate text-lg'>
										{user.email}
									</span>
								</div>
								<span className='ml-auto size-5'>
									<ChevronsUpDown />
								</span>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-sm bg-background text-headline border border-headline'
							side={isMobile ? "bottom" : "right"}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='gap-2 px-2 py-1.5 text-left text-md'>
									<div className='grid flex-1 text-left text-lg leading-tight'>
										<span className='truncate font-semibold'>
											{user.name}
										</span>
										<span className='truncate text-md'>
											{user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
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
					</DropdownMenu>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This will log you out of your account.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction onClick={logout} disabled={isLoading}>
								{isLoading ? <Loader2 className='animate-spin h-4 w-4' /> : "Continue"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
