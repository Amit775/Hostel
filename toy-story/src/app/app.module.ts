import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogPanelComponent } from './dialog-panel/dialog-panel.component';
import { environment } from 'src/environments/environment';
import { PanelComponent } from './panel/panel.component';
import { TabAComponent } from './panel/tab-a/tab-a.component';
import { TabBComponent } from './panel/tab-b/tab-b.component';
import { BasePanelComponent } from './base-panel/base-panel.component';
import { IframePanelComponent } from './iframe-panel/iframe-panel.component';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
import { HostDirective } from './component-panel/host.directive';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		DialogPanelComponent,
		PanelComponent,
		TabAComponent,
		TabBComponent,
		BasePanelComponent,
		IframePanelComponent,
		ComponentPanelComponent,
		HostDirective
	],
	imports: [
		BrowserModule,
		SharedModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([{ path: 'home', component: TopBarComponent }], { enableTracing: true })
	],
	providers: [],
	bootstrap: []
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef): void {
		if (environment.production) {
			const element = createCustomElement(AppComponent, {
				injector: this.injector
			});
			customElements.define('elm-toy-story-root', element);
			return;
		}

		appRef.bootstrap(AppComponent);
	}
}
