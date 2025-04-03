"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ApprovalCardData } from "@/types/types";
import { redirect } from "next/navigation";

interface ApprovalCardProps {
	data?: ApprovalCardData;
}

export default function ApprovalCard({ data }: ApprovalCardProps) {
	return (
		<Card
			onClick={() => {
				if (data?.id) {
					redirect(`/approvals/${data.id}`);
				}
			}}
			className='flex flex-row justify-between w-full border border-foreground/10 rounded-md p-7'
		>
			<div className='flex flex-col'>
				<span className='text-xl font-cabinet-medium text-foreground'>
					{data?.contractName}
				</span>
				<span className='text-[0.8em] text-foreground/60'>
					created by - {data?.sendersEmail}
				</span>
			</div>
			<div className='text-sm  h-full p-3 text-center text-foreground/60'>
				{data?.start} to {data?.end}
			</div>
			<div className='flex items-center gap-4 '>
				<Button className='text-primary-foreground'>
					<Trash />
				</Button>

				<Button
					// onClick={() => {
					// 	if (data?.contractHexID) {
					// 		redirect(`/contract/${data.contractHexID}`);
					// 	}
					// }}
					variant='outline'
					className='p-5 bg-card'
				>
					<span>open</span>
				</Button>
			</div>
		</Card>
	);
}
