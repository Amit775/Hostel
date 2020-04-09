import { Pipe, PipeTransform } from '@angular/core';
import { Option } from './select.component';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {
	transform(options: Option[], query: string): Option[] {
		return options.filter(option => option.display.includes(query));
	}
}
