"use client";

import ApprovalData from "@/components/approvals/approvalDetails";
import { getApprovalDetails } from "@/features/approvals/use-approval";
import { getContractDetails } from "@/features/contract/use-contract";
import { Timeline } from "@/types/types";
import { formatDate } from "@/utils/dataFormatter";
import { useParams } from "next/navigation";

const ApprovalDetails: React.FC = () => {
	const { id } = useParams();
	const hexId = Array.isArray(id) ? id[0] : id;

	if (!hexId) {
		return null;
	}

	const { data } = getApprovalDetails(hexId);

	if (!data) {
		return (
			<div className='flex justify-center items-center'>
				Loading contract details...
			</div>
		);
	}

	const contractdata = {
		hexID: hexId,
		contractName: data.data.contractName,
		contractStatus: data.data.status,
		ContractAmount: data.data.amount,
		createdBy: data.data.createdBy,
		creationDate: formatDate(data.data.creationDate),
		expirationDate: formatDate(data.data.expirationDate),
		// timeline: data.data.timeline,
	};

	return (
		<main key={hexId} className='p-3 h-full'>
			<ApprovalData data={contractdata} />
		</main>
	);
};

export default ApprovalDetails;
