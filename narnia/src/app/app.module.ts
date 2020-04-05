import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, DoBootstrap, ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		SharedModule
	],
	providers: [],
	bootstrap: []
})
export class AppModule implements DoBootstrap {

	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef) {
		if (environment.production) {
			const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
			customElements.define('elm-narnia-root', element);
			return;
		}

		appRef.bootstrap(AppComponent);
	}
}
