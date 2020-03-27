import { AbstractType, InjectFlags, InjectionToken, Injector, Type } from '@angular/core';


export class MergedInjector extends Injector {

	private injectors: Injector[] = [];
	constructor(...args: Injector[]) {
		super();
		this.injectors = [...args];
	}

	get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T {
		for (const injector of this.injectors) {
			console.log(token);
			try {
				const provider = injector.get(token, undefined, InjectFlags.Optional);
				if (provider != undefined) {
					return provider;
				}
				console.log(' - not found in -', injector);
			} catch {
				console.warn(' - not found in - ', injector);
			}
		}

		console.warn('not found at all');
		return notFoundValue;
	}
}
