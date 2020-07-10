import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
	{ path: 'moana/home', component: HomeComponent },
	{ path: '', redirectTo: 'moana/home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'moana/home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }