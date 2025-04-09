"use client";
import _Loader from "../misc/pageLoader";
import { DataTable } from "../ui/data-table";
import { getAllContract } from "@/features/contract/use-contract";
import { contractColumns } from "../transacts/columns";

const AllContract: React.FC = () => {
	const { data, isPending } = getAllContract();
	const tableData = data?.allContracts.map((item) => ({
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
					heading='Contracts'
					columns={contractColumns}
					data={tableData}
				/>
			) : (
				<div className='text-center p-4'>No transaction data available</div>
			)}
		</div>
	);
};

export default AllContract;
