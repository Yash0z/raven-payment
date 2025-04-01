"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { CardData } from "@/types/types";

interface BankCardProps {
	data?: CardData;
}

export default function ActiveContract({ data }: BankCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card
			onClick={() => {
				if (data?.contractHexID) {
					redirect(`/contract/${data.contractHexID}`);
				}
			}}
			className={`w-full max-h-35 bg-card border border-secondary-foreground/60 rounded-lg transition-all duration-200 ${
				isHovered ? "scale-[1.02] border-primary" : ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<CardContent>
				<div className='flex  justify-between items-start'>
					<h2 className='font-cabinet-medium flex gap-5 tracking-wide'>
						<span> {data?.contractName}</span>

						<span className='text-sm text-muted-foreground/80 bg-foreground/10 text-center p-1 px-5 rounded-md'>
							{data?.contractHexID}
						</span>
					</h2>
					<span className='text-right'>${data?.amount}</span>
				</div>

				<div className='mt-2 mb-2 flex justify-between '>
					<div className='space-y-2'>
						<span className='flex flex-col md:flex-row md:gap-2  text-muted-foreground text-[0.8em]'>
							<span className='text-muted-foreground'>Created by</span>
							<span>{data?.createdBy}</span>
						</span>
					</div>

					<div className='text-right'>
						<span className='flex flex-col md:flex-row md:gap2  text-muted-foreground text-[0.8em]'>
							<span>{data?.creation}-</span>
							<span>{data?.expiration}</span>
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
