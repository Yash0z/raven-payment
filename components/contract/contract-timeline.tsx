import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
} from "@/components/ui/timeline";
import { TimelineType } from "@/types/types";

interface TimelineProps {
	data: TimelineType[];
}
const ContractTimeline: React.FC<TimelineProps> = ({ data }) => {
	return (
		<>
			<Timeline>
				{data.map((item, index) => (
					<TimelineItem key={item.id}>
						<TimelineHeading
							status={item.status === "done" ? "done" : "default"}
							className='text-xl'
						>
							{item.date} - {item.status}
						</TimelineHeading>
						<TimelineDot
							status={item.status === "done" ? "done" : "default"}
						/>
						{index !== data.length - 1 && <TimelineLine done />}
						<TimelineContent
							status={item.status === "done" ? "done" : "default"}
							className='text-[0.8em]'
						>
							{item.title || `Payment: $${item.payment}`}
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</>
	);
};

export default ContractTimeline;
