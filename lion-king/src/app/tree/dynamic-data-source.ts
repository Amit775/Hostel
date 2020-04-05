import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { FlatTreeControl } from '@angular/cdk/tree';

import { DynamicDataItemNode } from './dynamic-data-node';
import { DynamicDatabaseService } from './dynamic-database.service';


export class DynamicDataSource implements DataSource<DynamicDataItemNode> {

	dataChange = new BehaviorSubject<DynamicDataItemNode[]>([]);

	get data(): DynamicDataItemNode[] { return this.dataChange.value; }
	set data(value: DynamicDataItemNode[]) {
		this.treeControl.dataNodes = value;
		this.dataChange.next(value);
	}

	constructor(
		private treeControl: FlatTreeControl<DynamicDataItemNode>,
		private database: DynamicDatabaseService
	) { }

	connect(collectionViewer: CollectionViewer): Observable<DynamicDataItemNode[]> {
		this.treeControl.expansionModel.changed.subscribe(
			(change: SelectionChange<DynamicDataItemNode>) => {
				if (change.added || change.removed) {
					this.handleTreeControl(change);
				}
			});
		return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
	}

	disconnect(collectionViewer: CollectionViewer): void { }

	/** Handle expand/collapse behaviors */
	handleTreeControl(change: SelectionChange<DynamicDataItemNode>) {
		if (change.added) {
			change.added.forEach(node => this.toggleNode(node, true));
		}
		if (change.removed) {
			change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
		}
	}

	/**
	 * Toggle the node, remove from display list
	 */
	toggleNode(node: DynamicDataItemNode, expand: boolean) {
		const children = this.database.getChildren(node.item);
		const index = this.data.indexOf(node);
		if (!children || index < 0) { // If no children, or cannot find the node, no op
			return;
		}

		node.isLoading = true;

		if (expand) {
			const nodes = children.map(name =>
				new DynamicDataItemNode(name, node.level + 1, this.database.isExpandable(name)));
			this.data.splice(index + 1, 0, ...nodes);
		} else {
			let count = 0;
			for (let i = index + 1; i < this.data.length
				&& this.data[i].level > node.level; i++, count++) { }
			this.data.splice(index + 1, count);
		}

		// notify the change
		this.dataChange.next(this.data);
		node.isLoading = false;
	}
}
