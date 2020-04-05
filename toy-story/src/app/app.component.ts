import { Component } from '@angular/core';
import { PanelService } from './core/panel.service';
import { PanelComponent } from './panel/panel.component';
import { SOME_STRING } from './panel/tab-b/tab-b.component';

@Component({
	selector: 'elm-ice-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	title = 'toy-story';

	constructor(private panel: PanelService) { }

	closeAll() {
		this.panel.closeAll();
	}

	openPanel() {
		const tokens = new WeakMap().set(SOME_STRING, 'hey! its my string!');
		const actions = new Map<string, () => void>([
			['Close', () => console.log('closed')]
		]);
		this.panel.openComponentPanel({ component: PanelComponent, title: 'Component Panel', actions, customTokens: tokens });
	}

	openDialog() {
		const actions = new Map<string, () => void>([
			['Yes', () => console.log('Confirm')],
			['No', () => this.reject()]
		]);
		this.panel.openDialogPanel({ title: 'Dialog Panel', message: 'Do you like the Dialog Panel?', actions });
	}

	openIframe() {
		this.panel.openIframePanel({ title: 'Iframe Panel', src: 'http://localhost:4200/' });
	}

	reject() {
		console.log('rejected');
	}
}
