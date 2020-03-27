import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MergedInjector } from '../../../hostel/src/app/shared/merged-injector';
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
			// tslint:disable-next-line: no-string-literal
			const hostelInjector: Injector = window['HostelInjector'];
			const element = createCustomElement(AppComponent,
				{ injector: new MergedInjector(this.injector, hostelInjector) }) as any;
			customElements.define('elm-bullshit-root', element);
			return;
		}

		appRef.bootstrap(AppComponent);

	}
}
