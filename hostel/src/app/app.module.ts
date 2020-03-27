import { LazyElementsModule } from '@angular-extensions/elements';
import { CUSTOM_ELEMENTS_SCHEMA, inject, Injector, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToasterService } from './core/toaster.service';
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

const hostelInjctor = Injector.create({
	providers: [
		{ provide: ToasterService, deps: [MatSnackBar], useFactory: () => new ToasterService(inject(MatSnackBar)) }
	],
	name: 'hostel'
});
// tslint:disable-next-line: no-string-literal
window['HostelInjector'] = hostelInjctor;
