"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	{
		id: "actions",
		cell: ({ row }) => {
			const hexID = row.original.hexID; // Extract just the hexID property

			return (
				<Button
					className='text-[0.8em]'
					variant='outline'
					onClick={() => (window.location.href = `/my-contracts/${hexID}`)}
				>
					<span>view</span>
					<span>
						<Eye />
					</span>
				</Button>
			);
		},
	},
];
