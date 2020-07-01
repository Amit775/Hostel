import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State, EMPTY_STATE } from '../../../../narnia/src/app/shared/state.interface';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private state = new BehaviorSubject<State>(EMPTY_STATE);
	public get state$(): Observable<State> {
		return this.state.asObservable();
	}

	public updateState(state: State): void {
		this.state.next(state);
	}

	public get value(): State {
		return this.state.value;
	}
}
