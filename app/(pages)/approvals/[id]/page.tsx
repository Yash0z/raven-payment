"use client";
import ApprovalData from "@/components/approvals/approvalDetails";
import Loader from "@/components/misc/pageLoader";
import { getApprovalDetails } from "@/features/approvals/use-approval";
import { formatDate } from "@/utils/dataFormatter";
import { useParams } from "next/navigation";

const ApprovalDetails: React.FC = () => {
	const { id } = useParams();
	const hexId = String(Array.isArray(id) ? id[0] : id);
	const { data, isPending } = getApprovalDetails(hexId);

	return (
		<main key={hexId} className='p-3 h-full'>
			{isPending ? (
				<Loader />
			) : data ? (
				<ApprovalData
					data={{
						hexID: hexId,
						contractName: data.data.contractName,
						contractStatus: data.data.status,
						ContractAmount: data.data.amount,
						createdBy: data.data.createdBy,
						creationDate: formatDate(data.data.creationDate),
						expirationDate: formatDate(data.data.expirationDate),
						timeline: data.data.timeline,
					}}
				/>
			) : (
				<div className='text-center p-4'>No transaction data available</div>
			)}
		</main>
	);
};

export default ApprovalDetails;
