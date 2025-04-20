import { TimelineType } from "@/types/types";
import ContractTimeline from "../contract/contract-timeline";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { AtSign, Link, CheckCircle, Loader2 } from "lucide-react";
import React from "react";
import { Switch } from "../ui/switch";
import { usePayout } from "@/features/payment/use-payout";
import { useRouter } from "next/navigation";

interface DataProps {
	data: {
		hexID: string;
		contractName: string;
		contractStatus: string;
		contractAmount: string;
		contractAgreement: string;
		createdBy: string;
		creationDate: string;
		expirationDate: string;
		timeline: TimelineType[];
		recipent: string;
	};
}

const ApprovedContractDetails: React.FC<DataProps> = ({ data }) => {
	// State to track if autopay is enabled
	const [isAutoreleaseEnabled, setIsAutoreleaseEnabled] =
		React.useState(false);
	const [showSuccess, setShowSuccess] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [isProcessing, setIsProcessing] = React.useState(false);
	const [processingMessage, setProcessingMessage] =
		React.useState("Processing...");
	const router = useRouter();
	// Handler for the switch toggle
	const handleToggleAutopay = (checked: boolean) => {
		setIsAutoreleaseEnabled(checked);
	};

	const next_due = () => {
		const lastDoneIndex = data.timeline.reduce((lastIndex, item, index) => {
			return item.status === "done" ? index : lastIndex;
		}, -1);
		const index = lastDoneIndex + 1;

		// Check if we've reached the end of the timeline
		if (index >= data.timeline.length) {
			return null; // No more items to pay
		}

		const nextDate = data.timeline[index].date;
		const nextPay = "₹" + data.timeline[index].payment;
		return {
			Date: nextDate,
			Payment: nextPay,
			index: index,
		};
	};

	const { mutate } = usePayout();

	const handleConfirmPay = (e: React.MouseEvent) => {
		// Prevent default to avoid dialog closing
		e.preventDefault();

		// Show processing state
		setIsProcessing(true);

		// Get the next due milestone info including its index
		const nextDue = next_due();

		if (!nextDue) return; // Early return if there's nothing to pay

		// Create a copy of the timeline
		const updatedTimeline: TimelineType[] = [...data.timeline];

		// Update the status of the next due milestone to "completed"
		updatedTimeline[nextDue.index] = {
			...updatedTimeline[nextDue.index],
			status: "done",
		};

		// Get the milestone ID
		const milestoneId = data.timeline[nextDue.index].id;

		if (milestoneId) {
			// Call the mutation with the contract ID, milestone ID, and updated timeline
			mutate({
				contractId: data.hexID,
				milestoneId: milestoneId,
				timeline: updatedTimeline,
			});

			// Update processing message after 2 seconds
			setTimeout(() => {
				setProcessingMessage("Payment being released...");
			}, 2000);

			// Update processing message after 4 seconds
			setTimeout(() => {
				setProcessingMessage("Almost done...");
			}, 4000);

			// Keep dialog open for 6 seconds before closing
			setTimeout(() => {
				setIsProcessing(false);
				setOpenDialog(false);

				// Show success message after dialog closes
				setShowSuccess(true);

				// Hide success message after 5 seconds
				setTimeout(() => {
					setShowSuccess(false);
				}, 5000);
			}, 6000);
		}
	};

	return (
		<>
			<main className='w-full h-full p-3 grid grid-rows-[1fr_6fr] gap-3'>
				{/* header */}
				<div className='border rounded-xl p-5 flex justify-between'>
					<div>
						<span className='flex gap-5 items-center'>
							<h1 className='font-haskoy-bold text-3xl mb-2'>
								{data.contractName}
							</h1>
							<Badge
								variant='outline'
								className='bg-secondary/50 text-[0.7em] text-secondary-foreground border-primary px-5 rounded-full'
							>
								{data.contractStatus}
							</Badge>
						</span>

						<p className='text-muted-foreground'>
							Recipent - {data.recipent}
						</p>
					</div>
					<div>
						<div className='text-right font-haskoy-bold text-3xl mb-2'>
							₹ {data.contractAmount}
						</div>
						<h1 className='text-muted-foreground'>
							{data.creationDate} - {data.expirationDate}
						</h1>
					</div>
				</div>
				{/* header */}
				{/* footer */}
				<div className='flex flex-col md:flex-row md:justify-between gap-3'>
					{/* timeline view */}
					<div className='md:w-[59%] p-5'>
						<h1 className='text-2xl font-satoshi-regular pb-6 text-muted-foreground'>
							Timeline
						</h1>
						<ContractTimeline data={data?.timeline} />
					</div>
					{/* timeline view */}
					{/* -------- */}
					{/* Action View */}
					<div className='md:w-[59%] p-5'>
						{next_due() ? (
							<>
								<div className='my-5 flex justify-between'>
									<div className='flex flex-col'>
										<h3 className='text-muted-foreground'>
											Next Payment Date :{" "}
										</h3>
										<span>{next_due()?.Date}</span>
									</div>
									<div className='flex flex-col'>
										<h3 className='text-muted-foreground'>
											Amount Payable :
										</h3>
										<span>{next_due()?.Payment}</span>
									</div>
								</div>
								{/* action 1 */}
								<div className='my-10'>
									{showSuccess && (
										<Alert className='mb-4 border-green-500 bg-green-50 text-green-800'>
											<AlertDescription className='flex items-center gap-2'>
												<CheckCircle className='h-4 w-4' />
												Payment of {next_due()?.Payment} has been
												released successfully!
											</AlertDescription>
										</Alert>
									)}

									<div className='flex items-center space-x-3 mb-5'>
										<Switch
											id='autopay'
											checked={isAutoreleaseEnabled}
											onCheckedChange={handleToggleAutopay}
										/>
										<h3 className='text-muted-foreground pb-1'>
											Auto Release
										</h3>
									</div>

									<AlertDialog
										open={openDialog}
										onOpenChange={(open) => {
											// Only allow closing if not processing
											if (!isProcessing) {
												setOpenDialog(open);
											}
										}}
									>
										<AlertDialogTrigger asChild>
											<Button
												size={"lg"}
												variant='outline'
												className='border-primary'
												disabled={isAutoreleaseEnabled}
												onClick={() => setOpenDialog(true)}
											>
												Manual Release
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													{isProcessing
														? "Processing Payment"
														: "Confirm Payment Release"}
												</AlertDialogTitle>
												<AlertDialogDescription>
													{isProcessing ? (
														<div className='flex flex-col items-center justify-center gap-4 py-4'>
															<Loader2 className='h-8 w-8 animate-spin text-primary' />
															<span>{processingMessage}</span>
														</div>
													) : (
														<>
															Are you sure you want to release
															the payment of{" "}
															{next_due()?.Payment}? This action
															cannot be undone.
														</>
													)}
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												{isProcessing ? null : (
													<>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<Button
															variant='default'
															onClick={handleConfirmPay}
														>
															Continue
														</Button>
													</>
												)}
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</>
						) : (
							<div className='my-5 p-4 border rounded-lg text-center'>
								<h3 className='text-primary font-semibold text-lg'>
									Contract Completed
								</h3>
								<p className='text-muted-foreground mt-2'>
									All payments have been released for this contract.
								</p>
							</div>
						)}

						<Dialog>
							<DialogHeader className='text-2xl font-satoshi-regular pb-5 text-muted-foreground'>
								Agreement Details
							</DialogHeader>
							<DialogTrigger asChild>
								<Button variant='outline'>
									<span>
										<Link />
									</span>
									<span>File</span>
								</Button>
							</DialogTrigger>
							<DialogContent className='text-start border-secondary bg-background overflow-y-auto text-xl h-[700px] w-[600px]'>
								<DialogTitle className='text-muted-foreground'>
									TERMS AND CONDITIONS
								</DialogTitle>
								{data.contractAgreement
									? data.contractAgreement
									: "No agreement data available"}
							</DialogContent>
						</Dialog>

						<div className='mt-10 flex flex-col gap-40'>
							<div>
								<h3 className='text-muted-foreground mb-5'>
									Didn&apos;t received your project files ??
								</h3>
								<Button variant='secondary' className='rounded-full'>
									<span>
										<AtSign />
									</span>
									<span className='pb-[0.2em]'>
										Contact - {data.createdBy}
									</span>
								</Button>
							</div>

							<div className='flex justify-end gap-2'>
								{next_due() ? (
									<>
										<Button
											size={"lg"}
											variant='outline'
											className='border-s'
										>
											{data.contractStatus === "hold"
												? "Activate Contract"
												: "Put Contract on Hold"}
										</Button>
										<Button
											size={"lg"}
											variant='outline'
											className='border-destructive hover:bg-destructive hover:text-muted'
										>
											Cancel Contract
										</Button>
									</>
								) : (
									<Button
										onClick={() => {
											router.push("/dashboard");
										}}
										size={"lg"}
										variant='outline'
										className='hover:bg-destructive hover:text-muted'
									>
										Exit
									</Button>
								)}
							</div>
						</div>
					</div>
					{/* Action View */}
				</div>
				{/* footer */}
			</main>
		</>
	);
};

export default ApprovedContractDetails;
