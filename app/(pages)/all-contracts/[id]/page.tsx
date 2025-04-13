"use client";
import AllContractDetails from "@/components/all-contract/all-contractDetais";
import Loader from "@/components/misc/pageLoader";
import { getAllContractDetails } from "@/features/contract/use-contract";
import { formatDate } from "@/utils/dataFormatter";
import { useParams } from "next/navigation";

const AllContract: React.FC = () => {
	const { id } = useParams();
	const hexId = String(Array.isArray(id) ? id[0] : id);
	const { data, isPending } = getAllContractDetails(hexId);

	return (
		<main key={hexId} className='p-3 h-full'>
			{isPending ? (
				<Loader />
			) : data ? (
				<AllContractDetails
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
                  recipent:data.data.recipientEmail
					}}
				/>
			) : (
				<div className='text-center p-4'>No contract data available</div>
			)}
		</main>
	);
};

export default AllContract;
