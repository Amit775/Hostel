import { LazyElementsModule } from '@angular-extensions/elements';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		LazyElementsModule.forRoot({
			rootOptions: {
				errorComponent: ErrorComponent,
				loadingComponent: LoadingComponent,
				isModule: true
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
