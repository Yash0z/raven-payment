type TimelineEvent = {
	id?: string;
	date: string;
	status: string;
	payment?: {
		amount?: number;
		currency?: string;
		[key: string]: any;
	};
	[key: string]: any; // Allow for other properties
};

// Define the timeline as an array of these events
export type Timeline = TimelineEvent[];
