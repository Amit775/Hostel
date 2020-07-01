import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';


@NgModule({
	declarations: [],
	imports: [
		CommonModule
	]
})
export class HostelRouterModule {
	static forRoot(routes: Routes, name: string, config?: ExtraOptions): ModuleWithProviders<RouterModule> {
		routes.forEach(route => { if (!route.outlet && route.component) { route.outlet = name; } });
		return RouterModule.forRoot(routes, config);
	}
}
