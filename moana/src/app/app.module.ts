import { NgModule, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { HomeComponent } from './home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		NavListComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule
	]
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef): void {
		if (environment.production) {
			const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
			customElements.define('elm-moana-root', element);
			return;
		}

		appRef.bootstrap(AppComponent);
	}
}
