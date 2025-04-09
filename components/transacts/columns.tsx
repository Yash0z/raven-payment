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
export type Contract = {
	Name: string;
	hexID: string;
	createdBy: string;
	status: string;
	Approval: string;
	amount: string;
};

export const transactionColumns: ColumnDef<Transaction>[] = [
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

export const contractColumns: ColumnDef<Contract>[] = [
	{
		accessorKey: "Name",
		header: "Name",
	},
	{
		accessorKey: "hexID",
		header: "HexID",
	},
	{
		accessorKey: "createdBy",
		header: "Created By",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "Approval",
		header: "Approval",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];
