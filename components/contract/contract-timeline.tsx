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
	// Find the index of the last "done" item
	const lastDoneIndex = data.reduce((lastIndex, item, index) => {
		return item.status === "done" ? index : lastIndex;
	}, -1);

	return (
		<>
			<Timeline>
				{data.map((item, index) => {
					// Determine dot status based on requirements
					let dotStatus:
						| "done"
						| "current"
						| "default"
						| "error"
						| "custom"
						| null
						| undefined = "default";

					if (item.status === "done") {
						dotStatus = "done";
					} else if (item.status === "hold") {
						dotStatus = "error";
					} else if (
						item.status === "pending" &&
						index === lastDoneIndex + 1
					) {
						dotStatus = "current";
					}

					return (
						<TimelineItem key={item.id}>
							<TimelineHeading
								status={item.status === "done" ? "done" : "default"}
								className='text-xl'
							>
								{item.date} - {item.status}
							</TimelineHeading>
							<TimelineDot status={dotStatus} />
							{index !== data.length - 1 && (
								<TimelineLine done={item.status === "done"} />
							)}
							<TimelineContent
								status={item.status === "done" ? "done" : "default"}
								className='text-[0.8em]'
							>
								{item.title || `Payment: $${item.payment}`}
							</TimelineContent>
						</TimelineItem>
					);
				})}
			</Timeline>
		</>
	);
};

export default ContractTimeline;
