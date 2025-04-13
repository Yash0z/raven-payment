"use client";
import _Loader from "../misc/pageLoader";
import { DataTable } from "../ui/data-table";
import { getMyContract } from "@/features/contract/use-contract";
import { MycontractColumns } from "../misc/columns";

const MyContract: React.FC = () => {
	const { data, isPending } = getMyContract();
	const tableData = data?.myContracts.map((item) => ({
		Name: item.contractName,
		hexID: item.hexId,
		createdBy: item.createdBy,
		status: item.status,
		Approval: item.approvalStatus,
		amount: item.amount,
	}));
	console.log(tableData);
	return (
		<div className='m-10  h-full'>
			{isPending ? (
				<_Loader />
			) : tableData ? (
				<DataTable
					heading='My Contracts'
					columns={MycontractColumns}
					data={tableData}
				/>
			) : (
				<div className='text-center p-4'>No transaction data available</div>
			)}
		</div>
	);
};

export default MyContract;
