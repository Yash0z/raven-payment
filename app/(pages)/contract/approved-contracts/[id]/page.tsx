"use client";
import ApprovedContractDetails from "@/components/approved-contract/approved-contractDetails";
import Loader from "@/components/misc/pageLoader";
import { getApprovedContractDetails } from "@/features/contract/use-contract";
import { formatDate } from "@/utils/dataFormatter";
import { useParams } from "next/navigation";

const ApprovedContract: React.FC = () => {
	const { id } = useParams();
	const hexId = String(Array.isArray(id) ? id[0] : id);
	const { data, isPending } = getApprovedContractDetails(hexId);

	return (
		<main key={hexId} className='p-3 h-full'>
			{isPending ? (
				<Loader />
			) : data ? (
				<ApprovedContractDetails
					data={{
						hexID: hexId,
						contractName: data.data.contractName,
						contractStatus: data.data.status,
						contractAmount: data.data.amount,
						createdBy: data.data.createdBy,
						contractAgreement: data.data.agreement,
						creationDate: formatDate(data.data.creationDate),
						expirationDate: formatDate(data.data.expirationDate),
						timeline: data.data.timeline,
						recipent: data.data.recipientEmail,
					}}
				/>
			) : (
				<div className='text-center p-4'>No contract data available</div>
			)}
		</main>
	);
};

export default ApprovedContract;
