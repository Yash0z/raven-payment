import { TimelineType } from "@/types/types";
import ContractTimeline from "./contract-timeline";
import { Badge } from "@/components/ui/badge";
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
			<main className='w-full h-full border-4 p-3 grid grid-rows-[1fr_6fr] gap-3'>
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

				<div className='flex justify-between '>
					<div className='border-2 w-[49%] p-5'>
						<h1 className='text-2xl font-satoshi-regular pb-6 text-muted-foreground'>
							Timeline
						</h1>
						<ContractTimeline data={data?.timeline} />
					</div>
					<div className='border-2 w-[49%]'>h1 </div>
				</div>
			</main>
		</>
	);
};
export default MyContractDetails;
