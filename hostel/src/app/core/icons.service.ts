import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconsService {

	constructor(private sanitizer: DomSanitizer, private registry: MatIconRegistry) { }
	registerIcons(icons: string[]) {
		icons.forEach(name =>
			this.registry.addSvgIcon(
				name,
				this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:44395/icons/${name}.svg`)
			)
		);
	}
}
