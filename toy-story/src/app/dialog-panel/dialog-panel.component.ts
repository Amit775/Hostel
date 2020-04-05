import { Component, InjectionToken, Inject } from '@angular/core';

export const PANEL_DIALOG_MESSAGE = new InjectionToken('message of dialog');

@Component({
	template: `
		<elm-ice-base-panel>
			{{ message }}
		</elm-ice-base-panel>
	`
})
export class DialogPanelComponent {
	constructor(@Inject(PANEL_DIALOG_MESSAGE) public message: string) {}
}
