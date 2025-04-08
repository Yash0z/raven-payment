"use client";
import { useTransacts } from "@/features/payment/use-payment";

const Transacts: React.FC = () => {
	const { data, isPending } = useTransacts();

	if (isPending) {
		return <div>Loading transactions...</div>;
	}

	if (!data || data.length === 0) {
		return <div>No transactions found.</div>;
	}

	return (
		<div className='container mx-auto p-4'>
			<h2 className='text-xl font-bold mb-4'>Transactions</h2>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-200'>
					<thead>
						<tr>
							<th className='px-4 py-2 border'>Transaction ID</th>
							<th className='px-4 py-2 border'>Amount</th>
							<th className='px-4 py-2 border'>Contract ID</th>
							<th className='px-4 py-2 border'>Payer ID</th>
							<th className='px-4 py-2 border'>Date</th>
						</tr>
					</thead>
					<tbody>
						{data.map((transaction) => (
							<tr key={transaction.transactionId}>
								<td className='px-4 py-2 border'>
									{transaction.transactionId}
								</td>
								<td className='px-4 py-2 border'>
									{transaction.amount}
								</td>
								<td className='px-4 py-2 border'>
									{transaction.contractId}
								</td>
								<td className='px-4 py-2 border'>
									{transaction.payerId}
								</td>
								<td className='px-4 py-2 border'>
									{new Date(
										transaction.updatedAt
									).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Transacts;
