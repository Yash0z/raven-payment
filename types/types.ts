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
export type Timeline = {
	id?: string;
	date: string;
	status: string;
	title: string;
	payment?: {
		amount?: number;
		currency?: string;
		[key: string]: any;
	};
	[key: string]: any;
	// Allow for other properties
};
