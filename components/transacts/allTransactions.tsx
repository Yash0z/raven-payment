"use client";
import { useTransacts } from "@/features/payment/use-payment";
import _Loader from "../misc/pageLoader";
import { DataTable } from "../ui/data-table";
import { transactionColumns } from "./columns";

const Transacts: React.FC = () => {
	const { data, isPending } = useTransacts();

	return (
		<div className='m-10  h-full'>
			{isPending ? (
				<_Loader />
			) : data ? (
				<DataTable
					heading='Transactions'
					columns={transactionColumns}
					data={data}
				/>
			) : (
				<div className='text-center p-4'>No transaction data available</div>
			)}
		</div>
	);
};

export default Transacts;
