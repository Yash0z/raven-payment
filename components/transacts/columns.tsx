"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
	transactionId: string;
	contractId: string;
	updatedAt: string;
	amount: string;
	payerId: string;
};

export const t_columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "transactionId",
		header: "Transaction ID",
	},
	{
		accessorKey: "updatedAt",
		header: "Date",
	},
	{
		accessorKey: "contractId",
		header: "Contract",
	},
	{
		accessorKey: "payerId",
		header: "Recipent",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];
