import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabContainerComponent } from './tab-container/tab-container.component';

const routes: Routes = [
	{ path: ':name', component: TabContainerComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'moana' },
	{ path: '**', redirectTo: 'moana' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
