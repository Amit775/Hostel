import { Injectable } from '@angular/core';

import { externalData, Item } from './data';
import { DynamicDataItemNode } from './dynamic-data-node';


@Injectable({ providedIn: 'root' })
export class DynamicDatabaseService {


	dataMap: Map<Item, Item[]> = new Map<Item, Item[]>();
	rootLevelNodes: Item[] = [];

	initializeMap() {
		this.rootLevelNodes = externalData.map(x => x);
		this.createDataMap(externalData);
	}

	createDataMap(data: Item[]) {
		data.forEach(item => {
			if (item.children) {
				this.dataMap.set(item, item.children);
				this.createDataMap(item.children);
			}
		});
	}

	/** Initial data from database */
	initialData(): DynamicDataItemNode[] {
		return this.rootLevelNodes.map(item => new DynamicDataItemNode(item, 0, this.hasChildren(item)));
	}

	getChildren(item: Item): Item[] | undefined {
		return this.dataMap.get(item);
	}

	isExpandable(item: Item): boolean {
		return this.dataMap.has(item);
	}

	hasChildren(item: Item): boolean {
		return item.children !== undefined && item.children.length > 0;
	}
}
