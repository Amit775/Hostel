import { Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { State, Topic, User } from './shared/state.interface';
import { StateManagerService } from './core/state-manager.service';
import { Subscription, Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
	selector: 'elm-narnia-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

	@ViewChild('stepper') stepper: MatStepper;

	@Output() stateChange = new EventEmitter<State>();

	private stateSubscription: Subscription;

	constructor(
		private stateManager: StateManagerService
	) { }

	get state$(): Observable<State> {
		return this.stateManager.state$;
	}

	ngOnInit() {
		this.stateSubscription = this.stateManager.state$.subscribe({
			next: state => this.stateChange.emit(state)
		});
		this.stateManager.loadUsers();
	}

	ngOnDestroy() {
		this.stateSubscription.unsubscribe();
	}

	setUser(selectedId: string): void {
		this.stateManager.userChange(selectedId);
		this.nextStep();
	}

	setTopic(selectedId: string) {
		this.stateManager.topicChange(selectedId);
		this.nextStep();
	}

	nextStep(): void {
		this.stepper.selected.completed = true;
		this.stepper.next();
	}

	get users$(): Observable<User[]> {
		return this.stateManager.users$;
	}
	get topics$(): Observable<Topic[]> {
		return this.stateManager.topics$;
	}

	loadUsers() {
		this.stateManager.loadUsers();
	}

	getValue = (item: User | Topic) => item.id;

	getDisplay = (item: User | Topic) => item.display;
}
