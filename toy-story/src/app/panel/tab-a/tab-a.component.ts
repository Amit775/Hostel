import {
	Component,
	OnInit,
	ViewChildren,
	QueryList,
	AfterViewInit,
	Input
} from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from '../panel.component';
import { MainService } from '../main.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core/option';
import { StateService } from 'src/app/core/state.service';

@Component({
	selector: 'elm-ice-tab-a',
	templateUrl: './tab-a.component.html',
	styleUrls: ['./tab-a.component.less']
})
export class TabAComponent implements AfterViewInit {
	constructor(
		private mainService: MainService,
		private panelRef: OverlayRef
	) { }

	@Input() optionsa: Option[];
	@Input() optionsb: Option[];

	@ViewChildren(MatSelect) selects: QueryList<MatSelect>;

	title = 'first tab';
	selectedValues: { a: Option; b: Option } = { a: null, b: null };

	ngAfterViewInit(): void {
		this.selects.map((select, index) =>
			select.optionSelectionChanges.subscribe(option =>
				this.valuesChanged(index, option)
			)
		);
	}

	save(): void {
		console.log('save', this.selectedValues);
	}

	close(): void {
		this.panelRef.dispose();
	}

	valuesChanged(index: number, optionChange: MatOptionSelectionChange) {
		const select = index === 0 ? 'a' : 'b';
		const option: Option = {
			display: optionChange.source.getLabel(),
			value: optionChange.source.value
		};
		this.selectedValues[select] = option;
		if (select === 'a' && this.selectedValues.a !== null) {
			this.selects.last.value = null;
			this.selectedValues.b = null;
			this.mainService.loadOptionsB();
		}
	}
}
