import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[elmIceHost]'
})
export class HostDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
