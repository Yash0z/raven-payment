"use client";
import _Loader from "@/components/misc/pageLoader";
import { getMyContractDetails } from "@/features/contract/use-contract";
import { TimelineType } from "@/types/types";
import { useParams } from "next/navigation";

const MyContractDetails: React.FC = () => {
	const { id } = useParams();
	const hexId = String(Array.isArray(id) ? id[0] : id);
	const { data, isPending } = getMyContractDetails(hexId);
	if (!data) {
		return (
			<div className='flex justify-center items-center'>
				<_Loader />
			</div>
		);
	}
	const TimelineData: Array<TimelineType> = data.data.timeline;
	return <>Hello from my contract</>;
};
export default MyContractDetails;
