import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
} from "@/components/ui/timeline";

const ContractTimeline: React.FC = () => {
	return (
		<>
			<Timeline>
				<TimelineItem>
					<TimelineHeading status='done' className='text-xl '>
						25-04-08
					</TimelineHeading>
					<TimelineDot status='done' />
					<TimelineLine done />
					<TimelineContent status="done" className='text-[0.8em]'>
						UI/Ux design
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineHeading status='done' className='text-xl '>
						25-04-15
					</TimelineHeading>
					<TimelineDot status='done' />
					<TimelineLine done />
					<TimelineContent status="done" className='text-[0.8em]'>
						Database design & Api routing
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineHeading className='text-xl text-primary'>
						25-04-22
					</TimelineHeading>
					<TimelineDot status='current' />
					<TimelineLine />
					<TimelineContent className='text-[0.8em]'>
						Frontend Integration
					</TimelineContent>
				</TimelineItem>
				<TimelineItem status='done'>
					<TimelineHeading className='text-xl text-primary'>
						25-04-29
					</TimelineHeading>
					<TimelineDot status='default' />
					{/* <TimelineLine /> */}
					<TimelineContent className='text-[0.8em]'>
						Done !
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</>
	);
};

export default ContractTimeline;
