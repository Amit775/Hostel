import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'platform' })
export class SharerService {
	private pvalue = 0;

	get value() {
		return this.pvalue;
	}

	inc() {
		this.pvalue += 1;
	}

}
