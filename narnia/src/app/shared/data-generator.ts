export interface Item {
	id: string;
	display: string;
}

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

function randString(length: number, words: number): string {
	const letters = 'אבגדהוזחטיכלמנסעפצקרשת';
	const result: string[] = [];
	let lastSpace = 0;
	for (let index = 0; index < length; index++) {
		const diff = index - lastSpace;
		if (index - lastSpace > 2 && words > 1) {
			const splitProb = Math.random();
			if (3 * splitProb < (diff - 2) || length - index < 3) {
				result.push(' ');
				lastSpace = index;
				words -= 1;
			}
		}
		const rand = Math.floor(Math.random() * letters.length);
		result.push(letters[rand]);
	}
	return result.join('');
}

export function genreateData(copies: number, display: { length: number, words: number }): Item[] {
	const items: Item[] = [];

	while (items.length < copies) {
		items.push({
			id: idManager.generate(),
			display: randString(display.length, display.words)
		});
	}

	return items;
}

export const idManager = new IdService();
