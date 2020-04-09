export interface User {
	id: string;
	display: string;
}

export interface Topic {
	id: string;
	display: string;
}

export enum Permissions {
	NONE,
	READ,
	WRITE,
	ADMIN
}

export interface State {
	user: User;
	topic: Topic;
	permissions: Permissions;
}

export const EMPTY_STATE: State = {
	user: undefined,
	topic: undefined,
	permissions: Permissions.NONE
};
