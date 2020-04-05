import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Option } from './panel.component';

@Injectable({
	providedIn: 'any'
})
export class MainService {
	private optionsa = new BehaviorSubject<Option[]>([]);
	public get optionsa$(): Observable<Option[]> {
		return this.optionsa.asObservable();
	}

	private optionsb = new BehaviorSubject<Option[]>([]);
	public get optionsb$(): Observable<Option[]> {
		return this.optionsb.asObservable();
	}

	loadOptionsA(): void {
		return this.optionsa.next(this.generateRandomOptions(10));
	}

	loadOptionsB(): void {
		return this.optionsb.next(this.generateRandomOptions(5));
	}

	reset(): void {
		this.optionsa.next([]);
		this.optionsb.next([]);
		this.loadOptionsA();
	}

	generateRandomOptions(n: number): Option[] {
		const result: Option[] = [];
		for (let index = 0; index < n; index++) {
			result.push({
				value: this.randString(false),
				display: this.randString(true)
			});
		}

		return result;
	}

	randString(isDisplay: boolean): string {
		const hebletters = 'אבגדהוזחטיכלמנסעפצקרשת';
		const engletters = 'abcdefghijklmnopqrstuvwxyz';
		const letters = isDisplay ? hebletters : engletters;
		const result: string[] = [];
		for (let index = 0; index < 6; index++) {
			const rand = Math.floor(Math.random() * letters.length);
			result.push(letters[rand]);
		}

		return result.join('');
	}
}
