import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SearchPipe } from './search.pipe';
import { SharedModule } from '../shared/shared.module';
import { ToOptionPipe } from './to-option.pipe';



@NgModule({
	declarations: [
		SelectComponent,
		SearchPipe,
		ToOptionPipe
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
		SelectComponent,
		ToOptionPipe,
		SearchPipe
	]
})
export class SelectModule { }
