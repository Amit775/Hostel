import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class DynamicDatabaseService {
	dataMap = new Map<string, string[]>([
		['Fruits', ['Apple', 'Orange', 'Banana']],
		['Vegetables', ['Tomato', 'Potato', 'Onion']],
		['Apple', ['Fuji', 'Macintosh']],
		['Onion', ['Yellow', 'White', 'Purple']]
	]);

	rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

	/** Initial data from database */
	initialData(): DynamicFlatNode[] {
		return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
	}

	getChildren(node: string): string[] | undefined {
		return this.dataMap.get(node);
	}

	isExpandable(node: string): boolean {
		return this.dataMap.has(node);
	}
}