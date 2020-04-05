import { Injectable, Injector } from '@angular/core';
import { Overlay, PositionStrategy, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { DialogPanelComponent, PANEL_DIALOG_MESSAGE } from '../dialog-panel/dialog-panel.component';
import { PANEL_IFRAME_SRC, IframePanelComponent } from '../iframe-panel/iframe-panel.component';
import { ComponentPanelComponent, PANEL_COMPONENT } from '../component-panel/component-panel.component';
import { ComponentPanelConfig, IframePanelConfig, DialogPanelConfig, PanelConfig } from '../base-panel/panel-config';
import { PANEL_CONFIG } from '../base-panel/base-panel.component';

export type PossiblePanelConfig = DialogPanelConfig | IframePanelConfig | ComponentPanelConfig;

@Injectable({ providedIn: 'root' })
export class PanelService {
	constructor(private injector: Injector, private overlay: Overlay) { }

	private overlays: OverlayRef[] = [];

	public closeAll() {
		this.overlays.forEach(overlay => overlay.dispose());
		this.overlays = [];
	}

	public openDialogPanel(config: DialogPanelConfig) {
		const tokens = this.initTokens(config)
			.set(PANEL_DIALOG_MESSAGE, config.message);
		this.openPanel(config, DialogPanelComponent, tokens);
	}

	public openIframePanel(config: IframePanelConfig) {
		const tokens = this.initTokens(config)
			.set(PANEL_IFRAME_SRC, config.src);
		this.openPanel(config, IframePanelComponent, tokens);
	}

	public openComponentPanel(config: ComponentPanelConfig) {
		const tokens = this.initTokens(config)
			.set(PANEL_COMPONENT, config.component);
		this.openPanel(config, ComponentPanelComponent, tokens);
	}

	private openPanel(config: OverlayConfig, component: ComponentType<any>, tokens: WeakMap<any, any>) {
		const ref = this.overlay.create({ ...this.defaultConfig, ...config});

		tokens.set(OverlayRef, ref);

		const portal = new ComponentPortal(component, null, this.createInjector(tokens));

		ref.attach(portal);
		this.overlays.push(ref);
	}

	private get defaultConfig(): OverlayConfig {
		return {
			positionStrategy: this.center(),
			width: '350px',
			maxHeight: '350px'
		};
	}

	private createInjector(tokens: WeakMap<any, any>): PortalInjector {
		return new PortalInjector(this.injector, tokens);
	}

	private initTokens(config: PanelConfig): WeakMap<any, any> {
		const tokens = config.customTokens || new WeakMap<any, any>();
		return tokens.set(PANEL_CONFIG, config);
	}

	private center(): PositionStrategy {
		return this.overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically();
	}
}
