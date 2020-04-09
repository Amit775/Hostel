import { Pipe, PipeTransform } from '@angular/core';
import { Option } from './select.component';

@Pipe({
	name: 'toOption'
})
export class ToOptionPipe<T> implements PipeTransform {

	transform(items: T[], value: (item: T) => string | number, display: (item: T) => string): Option[] {
		return items.map(item => {
			return {
				value: value(item),
				display: display(item)
			};
		});
	}
}
