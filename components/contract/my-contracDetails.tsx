import { TimelineType } from "@/types/types";
import ContractTimeline from "./contract-timeline";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Link } from "lucide-react";
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
	};
}
const MyContractDetails: React.FC<DataProps> = ({ data }) => {
	return (
		<>
			<main className='w-full h-full  p-3 grid grid-rows-[1fr_6fr] gap-3'>
				<div className='border p-5 flex justify-between'>
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

				<div className='flex flex-col md:flex-row md:justify-between gap-3'>
					<div className='border-2 md:w-[59%] p-5'>
						<h1 className='text-2xl font-satoshi-regular pb-6 text-muted-foreground'>
							Timeline
						</h1>
						<ContractTimeline data={data?.timeline} />
					</div>
					<div className='border-2 md:w-[59%] p-5 '>
						<Dialog>
							<DialogHeader className='text-2xl font-satoshi-regular pb-6 text-muted-foreground'>
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
						<div className='mt-5'></div>
					</div>
				</div>
			</main>
		</>
	);
};
export default MyContractDetails;
