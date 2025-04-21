import OngoingContract from "@/components/contract/ongoingContCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getOngoingContract } from "@/features/contract/use-contract";
import { formatDate } from "@/utils/dataFormatter";

export interface CardData {
	contractHexID: string;
	contractName: string;
	amount: string;
	createdBy: string;
	creation: string;
	expiration: string;
	nextDueDate: string;
}
export default function Ongoing() {
	const { data, isPending } = getOngoingContract();
	return (
		<>
			{isPending ? (
				<div className='flex flex-col space-y-3'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[250px]' />
						<Skeleton className='h-4 w-[200px]' />
					</div>
				</div>
			) : data?.OngoingContracts.length === 0 ? (
				<div className='flex justify-center items-center h-full'>
					<p className='text-muted-foreground'>No approvals available</p>
				</div>
			) : (
				data?.OngoingContracts.map((contract, index) => {
					const contractData = {
						contractHexID: contract.hexId,
						contractName: contract.contractName,
						amount: contract.amount,
						createdBy: contract.createdBy,
						creation: formatDate(contract.creationDate),
						expiration: formatDate(contract.expirationDate),
						nextDueDate: formatDate(contract.expirationDate),
					};

					return (
						<OngoingContract
							key={contract.hexId || index}
							data={contractData}
						/>
					);
				})
			)}
		</>
	);
}
