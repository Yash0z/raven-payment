"use client";
import { Box } from "@/components/dashboard/Main/header/box";
import Ongoing from "@/components/dashboard/Main/ongoing-contracts/ongoing-contract";

export default function Page() {
	return (
		<main className='bg-background flex flex-col  h-full '>
			<div className='mx-10 mt-5 '>
				<Box />
			</div>
			<div className='flex w-full px-10 '>
				<div className='max-h-md  w-[70%]  '>
					<h1 className='text-muted-foreground font-haskoy-bold text-2xl my-5  pl-1'>
						On-going Contracts
					</h1>
					<Ongoing />{" "}
				</div>
				<div className='max-h-md   w-[40%]'></div>
			</div>
		</main>
	);
}
