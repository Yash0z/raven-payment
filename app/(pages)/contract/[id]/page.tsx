"use client";
import _Loader from "@/components/misc/pageLoader";
import { getContractDetails } from "@/features/contract/use-contract";
import { TimelineType } from "@/types/types";
// import { formatDate } from "@/utils/dataFormatter";
import { useParams } from "next/navigation";

const ContractDetails: React.FC = () => {
	const { id } = useParams();
	const hexId = Array.isArray(id) ? id[0] : id;
	if (!hexId) {
		return;
	}

	const { data } = getContractDetails(hexId);
	if (!data) {
		return (
			<>
				<_Loader />
			</>
		);
	}
	const TimelineData: Array<TimelineType> = data?.data.timeline;

	return (
		<main key={hexId} className='flex flex-col gap-4 p-6'>
			<h1 className='text-2xl font-bold'>{data?.data.contractName}</h1>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<p>
						<strong>Recipient:</strong> {data?.data.recipientEmail}
					</p>
					<p>
						<strong>Contract ID:</strong> {data?.data.hexId}
					</p>
					<p>
						<strong>Amount:</strong> {data?.data.amount}
					</p>
					<p>
						<strong>Approval Status:</strong> {data?.data.approvalStatus}
					</p>
				</div>
				<div>
					<p>
						<strong>Created By:</strong> {data?.data.createdBy}
					</p>
					<p>
						<strong>Status:</strong> {data?.data.status}
					</p>
					{/* <p>
						<strong>Created On:</strong>{" "}
						{formatDate(data?.data.creationDate)}
					</p>
					<p>
						<strong>Expires On:</strong>{" "}
						{formatDate(data?.data.expirationDate)}
					</p> */}
				</div>
			</div>

			{/* Properly render the timeline array */}
			{data?.data.timeline && (
				<div className='mt-6'>
					<h2 className='text-xl font-semibold mb-3'>Timeline</h2>
					<ul className='space-y-2'>
						{TimelineData?.map(
							(contract: TimelineType, index: number) => (
								<li
									key={index}
									className='border-l-2 border-gray-300 pl-4 py-2'
								>
									<p>
										<strong>Date:</strong> {contract.date}
									</p>
									<p>
										<strong>Status:</strong> {contract.status}
									</p>
									<p>
										<strong>Status:</strong> {contract.id}
									</p>
									<p>
										<strong>Status:</strong> {contract.title}
									</p>
									{contract.payment && (
										<p>
											<strong>Payment:</strong>
											{typeof contract.payment === "object"
												? JSON.stringify(contract.payment)
												: contract.payment}
										</p>
									)}
								</li>
							)
						)}
					</ul>
				</div>
			)}
		</main>
	);
};
export default ContractDetails;
