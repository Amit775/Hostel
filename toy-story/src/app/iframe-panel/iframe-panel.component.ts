import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export const PANEL_IFRAME_SRC = new InjectionToken('src of iframe');

@Component({
	template: `
		<elm-ice-base-panel>
			<iframe frameborder="0" [src]="safeUrl"></iframe>
		</elm-ice-base-panel>
	`
})
export class IframePanelComponent implements OnInit {
	constructor(
		@Inject(PANEL_IFRAME_SRC) private src: string,
		private sanitizer: DomSanitizer
	) { }

	safeUrl: SafeResourceUrl;
	ngOnInit() {
		this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
	}
}
