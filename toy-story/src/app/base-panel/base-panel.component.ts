import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { PanelConfig } from './panel-config';
import { PanelOptions } from './panel-options';
import { OverlayRef } from '@angular/cdk/overlay';
import { PanelState } from './panel-state';

export const PANEL_CONFIG = new InjectionToken('config for panel');
@Component({
	selector: 'elm-ice-base-panel',
	templateUrl: 'base-panel.component.html',
	styleUrls: ['base-panel.component.less']
})
export class BasePanelComponent implements OnInit {

	state: PanelState = PanelState.DEFAULT;
	previousState: PanelState = PanelState.CLOSED;

	constructor(
		@Inject(PANEL_CONFIG) public config: PanelConfig,
		private overlayRef: OverlayRef
	) { }

	ngOnInit() {
		if (!this.config.options) this.config.options = PanelOptions.DEFAULT;
	}


	public get title(): string {
		return this.config.title;
	}

	public get actions(): Map<string, () => void> {
		return this.config.actions || new Map();
	}

	public get isCloseable(): boolean {
		return this.isSet(PanelOptions.CLOSEABLE);
	}

	public get isMinimizable(): boolean {
		return this.isSet(PanelOptions.MINIMIZABLE);
	}

	public get isMaximizable(): boolean {
		return this.isSet(PanelOptions.MAXIMIZABLE);
	}

	public get isDraggable(): boolean {
		return this.isSet(PanelOptions.DRAGGABLE);
	}

	public isSet(option: PanelOptions): boolean {
		return (this.config.options & option) === option;
	}

	public isMinimized(): boolean {
		return this.state === PanelState.MINIMIZED;
	}

	close(): void {
		this.state = PanelState.CLOSED;
		this.overlayRef.dispose();
	}

	toggleMinimize(): void {
		if (this.state !== PanelState.MINIMIZED) {
			this.previousState = this.state;
			this.state = PanelState.MINIMIZED;
		} else {
			this.state = this.previousState;
			this.previousState = PanelState.MINIMIZED;
		}
	}

	toggleMaximize(): void {
		if (this.state !== PanelState.MAXIMIZED) {
			this.previousState = this.state;
			this.state = PanelState.MAXIMIZED;
		} else {
			this.state = this.previousState;
			this.previousState = PanelState.MAXIMIZED;
		}
	}
}
