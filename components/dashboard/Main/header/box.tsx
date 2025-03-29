"use client";
import { userAtom } from "@/atoms/userAtom";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";

export const Box: React.FC = () => {
	const [user] = useAtom(userAtom);
	const name = user.name;
	const username = name.charAt(0).toUpperCase() + name.slice(1);

	return (
		<>
			<main className='flex flex-col h-full justify-between gap-10 px-5'>
				<div className='flex gap-2 items-center'>
					<h1 className='text-2xl md:text-3xl  text-muted-foreground font-zodiak-regular '>
						Hello,
					</h1>
					<h1 className='text-2xl md:text-3xl text-muted-foreground font-zodiak-regular '>
						{username}
					</h1>
				</div>
				<div className=''>
					<Button
						className='text-muted-foreground m-1 text-lg p-3 border-primary hover:bg-primary mb-10'
						size='lg'
						variant='outline'
					>
						Create <Plus className='mt-0.9' />
					</Button>
				</div>
			</main>
		</>
	);
};
