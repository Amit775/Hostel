import { Injectable } from '@angular/core';
import { State, User, EMPTY_STATE, Topic, Permissions } from '../shared/state.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { genreateData } from '../shared/data-generator';

@Injectable({ providedIn: 'root' })
export class StateManagerService {

	private state = new BehaviorSubject<State>(EMPTY_STATE);
	private topics = new BehaviorSubject<Topic[]>([]);
	private users = new BehaviorSubject<User[]>([]);

	get state$(): Observable<State> {
		return this.state.asObservable();
	}

	get topics$(): Observable<Topic[]> {
		return this.topics.asObservable();
	}

	get users$(): Observable<User[]> {
		return this.users.asObservable();
	}

	loadUsers(): void {
		const users: User[] = genreateData(400, { length: 10, words: 2 });
		this.users.next(users);
	}

	userChange(userId: string): void {
		const user = this.getUserById(userId);
		this.state.next({ ...EMPTY_STATE, user });
		this.loadTopics(userId);
	}

	topicChange(topicId: string): void {
		const topic = this.getTopicById(topicId);
		const currState = this.state.value;
		const permissions = this.getPermissions(topic, currState.user);
		this.state.next({ ...currState, topic, permissions });
	}

	private getPermissions(topic: Topic, user: User): Permissions {
		return Math.floor(Math.random() * 3 + 1) as Permissions;
	}

	private getUserById(userId: string): User {
		return this.users.value.find(user => user.id === userId);
	}

	private getTopicById(topicId: string): Topic {
		return this.topics.value.find(topic => topic.id === topicId);
	}

	private loadTopics(userId: string): void {
		const topics = genreateData(2000, { length: 13, words: 3 });
		this.topics.next(topics);
	}
}
