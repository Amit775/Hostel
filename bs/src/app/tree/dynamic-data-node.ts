import { Item } from './data';


export class DynamicDataNode<T> {
	constructor(
		public item: T,
		public level = 1,
		public expandable = false,
		public isLoading = false
	) { }
}

export class DynamicDataItemNode extends DynamicDataNode<Item> { }
