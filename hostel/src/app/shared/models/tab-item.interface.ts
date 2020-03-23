export interface TabElement extends CustomElement {
	display: string;
	icon: string;
}

export interface PanelElement extends CustomElement {
	title: string;
}

export interface CustomElement {
	type: string;
	element: string;
	src: string;
	application: string;
}
