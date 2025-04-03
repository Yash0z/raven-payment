"use client";
import ApprovalCard from "@/components/approvals/approvalCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getApprovals } from "@/features/approvals/use-approval";
import { formatDate } from "@/utils/dataFormatter";
const Approvae: React.FC = () => {
	const { data, isPending } = getApprovals();
	return (
		<>
			<div className='p-8'>
				<h1 className='font-haskoy-bold text-muted-foreground text-3xl'>
					Approvals
				</h1>
			</div>
			<main className='overflow-y-auto h-full py-5 flex  flex-col  gap-5 px-3 w-full'>
				{isPending ? (
					<>
						loading...
						<Skeleton className='bg-foreground' />
					</>
				) : (
					data?.contracts.map((contract, index) => {
						const contractData = {
							id: contract.hexId,
							contractName: contract.contractName,
							sendersEmail: contract.createdBy,
							start: formatDate(contract.creationDate),
							end: formatDate(contract.expirationDate),
						};

						return (
							<ApprovalCard
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
export default Approvae;
