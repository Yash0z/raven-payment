"use client";
import ActiveContract from "@/components/contract/activeContractCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveContract } from "@/features/contract/use-contract";

export const Footer: React.FC = () => {
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
			<h2 className='px-6 font-zodiak-regular mb-7 tex-2xl'>
				Active Contracts
			</h2>
			<main className='overflow-y-auto h-[380px] py-5 flex  flex-col justify-between gap-2 px-5 w-full'>
				{isPending ? (
					<Skeleton />
				) : (
					data?.contracts.map((contract, index) => {
						const contractData = {
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
