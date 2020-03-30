import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TreeComponent } from './tree/tree.component';


@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		TreeComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: []
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef) {
		if (environment.production) {
			const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
			customElements.define('elm-bullshit-root', element);
			return;
		}

		appRef.bootstrap(AppComponent);
	}
}
