import { Component, Input, Output, EventEmitter, Inject, ElementRef } from '@angular/core';
import { MatSelectChange, SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';

export class Option {
	value: string | number;
	display: string;
}

@Component({
	selector: 'elm-narnia-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.less']
})
export class SelectComponent {

	@Input() options: Option[];
	@Input() value: string | number | undefined;
	@Input() label: string;
	@Output() valueChange = new EventEmitter<string | number | undefined>();

	emitChange(event: MatSelectChange) {
		this.valueChange.emit(event.value);
	}

	stopPropagation(event: KeyboardEvent) {
		event.stopPropagation();
	}
}
