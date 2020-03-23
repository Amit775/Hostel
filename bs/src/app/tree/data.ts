export class IdService {
	public ids: string[] = [];

	public generate(): string {
		let isUnique = false;
		let tempId = '';

		while (!isUnique) {
			tempId = this.generator();
			if (!this.idExists(tempId)) {
				isUnique = true;
				this.ids.push(tempId);
			}
		}

		return tempId;
	}

	public remove(id: string): void {
		const index = this.ids.indexOf(id);
		this.ids.splice(index, 1);
	}

	private generator(): string {
		const isString = `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;

		return isString;
	}

	private idExists(id: string): boolean {
		return this.ids.includes(id);
	}

	private S4(): string {
		// tslint:disable-next-line: no-bitwise
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
}
const idManager = new IdService();

export interface Base {
	id: string;
	display: string;
}

export interface Folder extends Base {
	children: Item[];
}

export type Item = Base | Folder;

export const data: Item[] = [
	{
		id: idManager.generate(),
		display: randString()
	},
	{
		id: idManager.generate(),
		display: randString()
	},
	{
		id: idManager.generate(),
		display: randString()
	},
	{
		id: idManager.generate(),
		display: randString(),
		children: [{
			id: idManager.generate(),
			display: randString()
		},
		{
			id: idManager.generate(),
			display: randString(),
			children: [{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString(),
				children: [{
					id: idManager.generate(),
					display: randString()
				},
				{
					id: idManager.generate(),
					display: randString()
				},
				{
					id: idManager.generate(),
					display: randString()
				},
				{
					id: idManager.generate(),
					display: randString()
				}]
			}]
		},
		{
			id: idManager.generate(),
			display: randString()
		},
		{
			id: idManager.generate(),
			display: randString(),
			children: [	{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString()
			},
			{
				id: idManager.generate(),
				display: randString(),
				children: [{
					id: idManager.generate(),
					display: randString()
				},
				{
					id: idManager.generate(),
					display: randString(),
					children: [{
						id: idManager.generate(),
						display: randString()
					},
					{
						id: idManager.generate(),
						display: randString()
					},
					{
						id: idManager.generate(),
						display: randString()
					},
					{
						id: idManager.generate(),
						display: randString(),
						children: [{
							id: idManager.generate(),
							display: randString()
						},
						{
							id: idManager.generate(),
							display: randString()
						},
						{
							id: idManager.generate(),
							display: randString()
						},
						{
							id: idManager.generate(),
							display: randString()
						}]
					}]
				},
				{
					id: idManager.generate(),
					display: randString()
				},
				{
					id: idManager.generate(),
					display: randString()
				}]
			}]
		}]
	}
];


function randString(): string {
	const letters = 'abcdefghijklmnopqrstuvwkyzABCDEFGHIJKLMNOPQRSTUVWKYZ';
	const result: string[] = [];
	for (let index = 0; index < 5; index++) {
		const rand = Math.floor(Math.random() * letters.length);
		result.push(letters[rand]);
	}

	return result.join('');
}
