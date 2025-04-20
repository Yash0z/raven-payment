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

import { Button } from "../ui/button";
import { AtSign, Link } from "lucide-react";

import React from "react";
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
const MyContractDetails: React.FC<DataProps> = ({ data }) => {
	const router = useRouter();

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

	const handlePay = () => {
		console.log();
	};

	return (
		<>
			<main className='w-full h-full  p-3 grid grid-rows-[1fr_6fr] gap-3'>
				{/* header */}
				<div className=' border  rounded-xl p-5 flex justify-between'>
					<div>
						<span className='flex gap-5 items-center'>
							<h1 className='font-haskoy-bold text-3xl mb-2'>
								{data.contractName}
							</h1>
							<Badge
								variant='outline'
								className='bg-secondary/50 text-[0.7em] text-secondary-foreground border-primary px-5  rounded-full'
							>
								{data.contractStatus}
							</Badge>
						</span>

						<p className='text-muted-foreground '>
							Created By - {data.createdBy}
						</p>
					</div>
					<div>
						<div className='text-right font-haskoy-bold text-3xl mb-2'>
							₹ {data.contractAmount}
						</div>
						<h1 className='text-muted-foreground'>
							{data.creationDate} -{data.expirationDate}
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
					<div className='md:w-[59%] p-5 '>
						{next_due() ? (
							<>
								<div className='my-5 flex justify-between'>
									<div className='flex flex-col'>
										<h3 className='text-muted-foreground'>
											Next Due Date :{" "}
										</h3>
										<span>{next_due()?.Date}</span>
									</div>
									<div className='flex flex-col'>
										<h3 className='text-muted-foreground'>
											Receivable Amount :
										</h3>
										<span>{next_due()?.Payment}</span>
									</div>
								</div>
								{/* action 1 */}
								<div className=' my-10'>
									<h3 className='text-muted-foreground mb-5'>
										Upload your project files
									</h3>
									<Button
										size={"lg"}
										variant='outline'
										onClick={handlePay}
										className='border-primary'
									>
										Upload
									</Button>
								</div>
							</>
						) : (
							<div className='my-5 p-4 border rounded-lg text-center'>
								<h3 className='text-primary font-semibold text-lg'>
									Contract Completed
								</h3>
								<p className='text-muted-foreground mt-2'>
									All milestones for this contract have been completed.
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
							<DialogContent className='text-start border-secondary bg-background overflow-y-auto text-xl h-[700px] w-[600px] '>
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
								<h3 className='text-muted-foreground mb-5 '>
									Didn&apos;t received your Payment ??
								</h3>
								<Button variant='secondary' className='rounded-full '>
									<span>
										<AtSign />
									</span>
									<span className='pb-[0.2em]'>
										Contact - {data.recipent}
									</span>
								</Button>
							</div>

							<div className='flex justify-end gap-2'>
								{next_due() ? (
									<>
										<Button
											size={"lg"}
											variant='outline'
											onClick={handlePay}
											className='border-s'
										>
											{data.contractStatus === "hold"
												? "Activate Contract"
												: "Put Contract on Hold"}
										</Button>
										<Button
											size={"lg"}
											variant='outline'
											onClick={handlePay}
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
export default MyContractDetails;
