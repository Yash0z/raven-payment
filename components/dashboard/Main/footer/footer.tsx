"use client";
import ActiveContract from "@/components/contract/activeContractCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveContract } from "@/features/contract/use-contract";

export const Footer: React.FC = () => {
	const { data, isPending } = getActiveContract();
	if (!data) {
		return <></>;
	}
	const formatDate = (dateString: string) => {
		if (!dateString) return "Not specified";
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
		} catch (error) {
			return "Invalid date";
		}
	};
	const contractData = {
		contractName: data.contracts.contractName,
		amount: data.contracts.amount,
		createdBy: data.contracts.createdBy,
		creation: formatDate(data.contracts.creationDate),
		expiration: formatDate(data.contracts.expirationDate),
		nextDueDate: data.contracts.timeline,
	};
	return (
		<>
			<h2 className='px-6 font-zodiak-regular mb-7 tex-2xl'>
				Active Contracts
			</h2>
			<main className='flex flex-col h-full justify-between gap-10 px-5 w-full'>
				{isPending ? (
					<Skeleton />
				) : contractData ? (
					<ActiveContract data={contractData} />
				) : (
					<div className='text-center py-4'>No active contract found</div>
				)}
			</main>
		</>
	);
};
