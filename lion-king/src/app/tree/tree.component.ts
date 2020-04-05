import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';

import { DynamicDataItemNode } from './dynamic-data-node';
import { DynamicDataSource } from './dynamic-data-source';
import { DynamicDatabaseService } from './dynamic-database.service';


@Component({
	selector: 'elm-lion-king-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {

	treeControl: FlatTreeControl<DynamicDataItemNode>;
	dataSource: DynamicDataSource;

	constructor(private database: DynamicDatabaseService) { }

	ngOnInit() {
		this.database.initializeMap();
		this.treeControl = new FlatTreeControl<DynamicDataItemNode>(this.getLevel, this.isExpandable);
		this.dataSource = new DynamicDataSource(this.treeControl, this.database);

		this.dataSource.data = this.database.initialData();
	}

	getLevel = (node: DynamicDataItemNode) => node.level;

	isExpandable = (node: DynamicDataItemNode) => node.expandable;

	hasChild = (_: number, node: DynamicDataItemNode) => node.expandable;
}
