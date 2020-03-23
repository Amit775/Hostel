import { Component, OnInit } from '@angular/core';

import { data } from './data';


@Component({
	selector: 'elm-bullshit-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {

	treeControl: FlatTreeControl<DynamicFlatNode>;
	dataSource: DynamicDataSource;

	constructor(private database: DynamicDatabase) { }

	ngOnInit() {
		this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new DynamicDataSource(this.treeControl, this.database);

		this.dataSource.data = this.database.initialData();
	}

	getLevel = (node: DynamicFlatNode) => node.level;

	isExpandable = (node: DynamicFlatNode) => node.expandable;

	hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
