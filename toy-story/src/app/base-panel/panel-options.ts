export enum PanelOptions {
	CLOSEABLE = 1 << 0,
	MINIMIZABLE = 1 << 1,
	MAXIMIZABLE = 1 << 2,
	DRAGGABLE = 1 << 3,
	RESIZEABLE = 1 << 4,
	DEFAULT = CLOSEABLE | MINIMIZABLE | DRAGGABLE,
	// ALLOWMULTIPLE = 1 << 5,
	// ALLOWOTHERS = 1 << 6
}