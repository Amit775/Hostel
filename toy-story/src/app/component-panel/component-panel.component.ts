import { Component, InjectionToken, Inject, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HostDirective } from './host.directive';

export const PANEL_COMPONENT = new InjectionToken('component for panel');
@Component({
	template: `
		<elm-ice-base-panel>
			<ng-template elmIceHost></ng-template>
		</elm-ice-base-panel>
	`
})
export class ComponentPanelComponent<T> implements OnInit {

	@ViewChild(HostDirective, { static: true }) host: HostDirective;

	constructor(
		@Inject(PANEL_COMPONENT) private component: ComponentType<T>,
		private resolver: ComponentFactoryResolver
	) { }

	ngOnInit() {
		this.loadComponent();
	}

	private loadComponent(): void {
		const factory = this.resolver.resolveComponentFactory(this.component);
		const vcr = this.host.viewContainerRef;
		vcr.createComponent(factory);
	}
}
