"use client";
import _Loader from "../misc/pageLoader";
import { DataTable } from "../ui/data-table";
import { getApprovedContract } from "@/features/contract/use-contract";
import { ApprovedContractColumns } from "../misc/columns";

const ApprovedContract: React.FC = () => {
	const { data, isPending } = getApprovedContract();
	const tableData = data?.approvedContracts.map((item) => ({
		Name: item.contractName,
		hexID: item.hexId,
		createdBy: item.createdBy,
		status: item.status,
		Approval: item.approvalStatus,
		amount: item.amount,
		recipent: item.recipientEmail,
	}));
	console.log(tableData);
	return (
		<div className='m-10  h-full'>
			{isPending ? (
				<_Loader />
			) : tableData ? (
				<DataTable
					heading='Approved Contracts'
					columns={ApprovedContractColumns}
					data={tableData}
				/>
			) : (
				<div className='text-center p-4'>No transaction data available</div>
			)}
		</div>
	);
};

export default ApprovedContract;
