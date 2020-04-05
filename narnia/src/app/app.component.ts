import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'elm-chg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

	private subject = new Subject<string>();

	@Input() title: string = 'סיפורי נרניה';
	@Output() out = new EventEmitter<{ title: string }>();

	ngOnInit() {
		this.subject.subscribe({ next: t => this.title = t });

	}
	emit(input: HTMLInputElement) {
		console.log('emit');
		this.subject.next(input.value);
		input.value = '';

	}
}
