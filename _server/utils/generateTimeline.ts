import { format } from "date-fns";

export function generateTimeline(
	creationDate: Date,
	expirationDate: Date,
	milestones: number,
	amount: number
) {
	if (milestones <= 0) {
		throw new Error("Milestones must be greater than zero.");
	}

	const timeDiff = expirationDate.getTime() - creationDate.getTime();
	const interval = timeDiff / milestones;
	const milestoneAmount = amount / milestones;

	return Array.from({ length: milestones }, (_, i) => {
		const milestoneDate = new Date(
			creationDate.getTime() + interval * (i + 1)
		);
		return {
			id: i + 1,
			payment: milestoneAmount.toFixed(2),
			date: format(milestoneDate, "yy-MM-dd"),
		};
	});
}
