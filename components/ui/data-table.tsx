"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
	heading: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	heading,
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div>
			<h1 className='text-3xl font-haskoy-bold mb-10'>{heading}</h1>
			<div className='rounded-md border'>
				<Table className='font-cabinet-medium '>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								className='bg-accent/30 hover:bg-accent/30 pointer'
								key={headerGroup.id}
							>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className='text-muted-foreground text-xl font-haskoy-extrabold pl-4 '
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className='hover:bg-accent/30 '
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className='h-18 pl-4 text-[1.3em]'
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='outline'
					size='lg'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<span>
						<ChevronLeft />
					</span>
				</Button>
				<Button
					variant='outline'
					size='lg'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<span>
						<ChevronRight />
					</span>
				</Button>
			</div>
		</div>
	);
}
