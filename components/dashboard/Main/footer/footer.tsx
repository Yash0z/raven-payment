"use client";
import ActiveContract from "@/components/contract/activeContractCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveContract } from "@/features/contract/use-contract";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export const Footer: React.FC = () => {
	const queryClient = useQueryClient();
	const { data, isPending } = getActiveContract();
	const formatDate = (dateString: string) => {
		if (!dateString) return "Not specified";

		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};
	return (
		<>
			<div className='flex gap-4 px-6 font-zodiak-regular mb-7 tex-2xl'>
				<h2 className=''>Active Contracts</h2>
				<Button
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: ["activeContracts"],
						});
					}}
					variant='ghost'
					className='hover:bg-background p-0 pb-1'
				>
					<span>
						<RefreshCcw size={24} />
					</span>
				</Button>
			</div>

			<main className='overflow-y-auto h-[380px] py-5 flex  flex-col justify-between gap-2 px-5 w-full'>
				{isPending ? (
					<Skeleton />
				) : (
					data?.contracts.map((contract, index) => {
						const contractData = {
                     contractHexID:contract.hexId,
							contractName: contract.contractName,
							amount: contract.amount,
							createdBy: contract.createdBy,
							creation: formatDate(contract.creationDate),
							expiration: formatDate(contract.expirationDate),
							nextDueDate: contract.timeline,
						};

						return (
							<ActiveContract
								key={contract.hexId || index}
								data={contractData}
							/>
						);
					})
				)}
			</main>
		</>
	);
};
