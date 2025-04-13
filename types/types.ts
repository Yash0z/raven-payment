export type userData = {
	id: string;
	name: string;
	email: string;
	avatar: string | null | undefined;
};
export type authSignUp = {
	email: string;
	password: string;
	name: string;
};
export type authSignIn = {
	email: string;
	password: string;
};
export interface CardData {
	contractHexID: string;
	contractName: string;
	amount: string;
	createdBy: string;
	creation: string;
	expiration: string;
	nextDueDate: string;
}
export interface ApprovalCardData {
	id: string;
	contractName: string;
	sendersEmail: string;
	start: string;
	end: string;
}
export type TimelineType = {
	id?: string;
	date: string;
	status: string;
	title: string;
	payment: string;
	[key: string]: any;
	// Allow for other properties
};
