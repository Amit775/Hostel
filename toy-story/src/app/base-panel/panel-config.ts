import { OverlayConfig, ComponentType } from '@angular/cdk/overlay';
import { PanelOptions } from './panel-options';

export class PanelConfig extends OverlayConfig {
	title: string;
	actions?: Map<string, () => void>;
	customTokens?: WeakMap<any, any>;
	options?: PanelOptions;
}

export class IframePanelConfig extends PanelConfig {
	src: string;
}

export class DialogPanelConfig extends PanelConfig {
	message: string;
}

export class ComponentPanelConfig extends PanelConfig {
	component: ComponentType<any>;
}
