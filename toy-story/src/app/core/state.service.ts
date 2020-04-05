import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StateService {
	private pvalue = 0;
	public get value() {
		return this.pvalue;
	}

	inc() {
		this.pvalue++;
	}
}
