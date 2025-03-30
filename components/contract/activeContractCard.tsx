"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Sample data object that would be passed to the component
interface CardData {
	contractName: string;
	amount: string;
	createdBy: string;
	creation: string;
	expiration: string;
	nextDueDate: string;
}

interface BankCardProps {
	data?: CardData;
}

export default function ActiveContract({ data }: BankCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card
			className={`w-full max-h-35 bg-card border border-secondary-foreground/60 rounded-lg transition-all duration-200 ${
				isHovered ? "scale-[1.02] border-primary" : ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<CardContent>
				<div className='flex justify-between items-start'>
					<h2 className='font-cabinet-medium  tracking-wide'>
						{data?.contractName}
					</h2>
					<span className='text-right'>${data?.amount}</span>
				</div>

				<div className='mt-2 mb-2 flex justify-between '>
					<div className='space-y-2'>
						<span className='flex flex-col md:flex-row md:gap-0 gap-2 text-muted-foreground text-[0.8em]'>
							<span className='text-muted-foreground'>Created by</span>
							<span>{data?.createdBy}</span>
						</span>
					</div>

					<div className='text-right'>
						<span className='flex flex-col md:flex-row md:gap-0 gap-2 text-muted-foreground text-[0.8em]'>
							<span>{data?.creation}-</span>
							<span>{data?.expiration}</span>
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
