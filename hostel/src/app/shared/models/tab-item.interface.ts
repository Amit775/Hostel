export interface TabElement extends CustomElement {
	display: string;
	icon: string;
	route: string;
	index?: number;
}

export interface CustomElement {
	element: string;
	src: string;
}
