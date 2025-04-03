"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface ApprovalDataProps {
	data: {
		hexID: string;
		contractName: string;
		contractStatus: string;
		ContractAmount: string;
		createdBy: string;
		creationDate: string;
		expirationDate: string;
	};
}
const ApprovalData: React.FC<ApprovalDataProps> = ({ data }) => {
	const [showApproveDialog, setShowApproveDialog] = useState(false);
	const [showRejectDialog, setShowRejectDialog] = useState(false);

	const handleApprove = () => {
		// Handle approve logic here
		console.log("Contract approved");
		setShowApproveDialog(false);
	};

	const handleReject = () => {
		// Handle reject logic here
		console.log("Contract rejected");
		setShowRejectDialog(false);
	};

	return (
		<div className='w-full h-full  font-cabinet-medium'>
			<main className=' p-10  flex flex-col justify-between h-full'>
				<div className='mb-8 flex items-start justify-between'>
					<div>
						<h1 className='mb-5 font-haskoy-bold text-3xl'>
							{" "}
							{data?.contractName}
						</h1>
						<p className='text-[0.9em] mb-1 text-muted-foreground'>
							Created b y - {data?.createdBy}
						</p>
						<p className='text-[0.9em] text-muted-foreground'>
							Duration - {data?.creationDate} to {data?.expirationDate}
						</p>
					</div>
					<div className='text-right'>
						<p className='text-3xl '>{data?.ContractAmount}</p>
					</div>
				</div>

				{/* Timeline */}
				<div className=''></div>

				{/* Footer */}
				<div className='flex items-center justify-between'>
					<div className='rounded-full  text-muted-foreground border  px-3 py-2 text-sm'>
						Status: {data?.contractStatus}
					</div>
					<div className='flex gap-4'>
						<Button
							variant='ghost'
							onClick={() => setShowRejectDialog(true)}
							className='text-muted-foreground p-4'
						>
							Reject
						</Button>
						<Button
							variant='outline'
							onClick={() => setShowApproveDialog(true)}
							className='p-4'
						>
							Approve
						</Button>
					</div>
				</div>
			</main>
			{/* Approve Dialog */}
			<AlertDialog
				open={showApproveDialog}
				onOpenChange={setShowApproveDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Approve Contract</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to approve this contract? By
							Approving the contract you aggree to all the terms & and
							conditions
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleApprove}
							className='bg-constructive hover:bg-constructive/80 text-background'
						>
							Approve
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Reject Dialog */}
			<AlertDialog
				open={showRejectDialog}
				onOpenChange={setShowRejectDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Reject Contract</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to reject this contract? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleReject}
							className='bg-destructive hover:bg-constructive/80 text-background'
						>
							Reject
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
export default ApprovalData;
