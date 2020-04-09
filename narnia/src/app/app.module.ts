import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, DoBootstrap, ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SelectModule } from './select/select.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		SharedModule,
		SelectModule
	],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { displayDefaultIndicatorType: false }
		}
	],
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
