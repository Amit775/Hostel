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

export interface Item {
	id: string;
	display: string;
	children?: Item[];
}

export const externalData: Item[] = [
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
	const letters = 'אבגדהוזחטיכלמנסעפצקרשת';
	const result: string[] = [];
	for (let index = 0; index < 16; index++) {
		if (index % 4 === 0 && index !== 0) result.push(' ');
		const rand = Math.floor(Math.random() * letters.length);
		result.push(letters[rand]);
	}

	return result.join('');
}
