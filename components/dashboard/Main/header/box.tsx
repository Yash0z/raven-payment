"use client";
import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
export const Box: React.FC = () => {
	const [user] = useAtom(userAtom);
	const router = useRouter();
	const [username, setUsername] = useState<string>("");

	useEffect(() => {
		// Only set the username on the client side after component mounts
		if (user?.name) {
			const formattedName =
				user.name.charAt(0).toUpperCase() + user.name.slice(1);
			setUsername(formattedName);
		}
	}, [user?.name]);

	const handleCreateClick = () => {
		router.push("/contract/create-contract");
	};

	return (
		<>
			<main className='flex flex-col h-full justify-between gap-10 pt-5'>
				<div className='flex gap-2 items-center'>
					<h1 className='text-2xl md:text-3xl text-muted-foreground font-zodiak-regular '>
						Hello,
					</h1>
					<h1 className='text-2xl md:text-3xl text-muted-foreground font-zodiak-regular '>
						{username}
					</h1>
				</div>
				<div className=''>
					<InteractiveHoverButton
						className='bg-background'
						onClick={handleCreateClick}
					>
						Create
					</InteractiveHoverButton>
				</div>
			</main>
		</>
	);
};
