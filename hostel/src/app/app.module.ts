import { LazyElementsModule } from '@angular-extensions/elements';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';


@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent,
		LoadingComponent,
		TabContainerComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		AppRoutingModule,
		LazyElementsModule.forRoot({
			rootOptions: {
				errorComponent: ErrorComponent,
				loadingComponent: LoadingComponent,
				isModule: true
			}
		})
	],
	bootstrap: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef) {
		if (environment.production) {
			const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
			customElements.define('elm-hostel', element);
			return;
		}

		appRef.bootstrap(AppComponent);
	}
}
