import { getElemsByDataset, TElemsByDataset } from "./getElemsByDataset";

const VALUE_USED_ATTR = "[data-value-used]";

export type TState = { [key: string]: string | number } | null;

/** Сервис, реализующий логику работы со стейтом компонента и логику его обновления на связанных тэгах.
 * Объект стейта является реактивным, изменение свойств в нем будет вызывать ререндер связанных компонентов */
export class StateService {
	/** Реактивное состояние компонента, где каждое свойство может быть привязано к определенным тэгам */
	public state: TState;

	/** Ссылка на элемент в котором надо искать привязки к стейту */
	private readonly ref: HTMLElement;

	/** Ключи из стейта, привязанные к определенным тэгам */
	private valueUsedKeys: TElemsByDataset = {};

	constructor(ref: HTMLElement, defaultState: TState) {
		this.state = defaultState;
		this.ref = ref;
	}

	/** Связать стейт с соответствующими тэгами */
	public bindState(): void {
		if (this.state == null) return;

		this.initValueUsedArr();
		this.bindValues();
	}

	/** Получаем все значения из стейта, которые используются с привязкой к тэгам */
	private initValueUsedArr() {
		this.valueUsedKeys = getElemsByDataset(this.ref, VALUE_USED_ATTR);
	}

	/** Добавляем сеттеры к тем значениям стейта, которые используются */
	private bindValues() {
		const keys = Object.keys(this.valueUsedKeys);

		for (const key of keys) {
			let valueOld = this.state?.[key];
			Object.defineProperty(this.state, key, {
				set: (valueNew: string | number) => {
					if (valueNew !== valueOld) {
						console.log("update!");
						this.updateElements(key, valueNew);
					} else {
						console.log("not update");
					}

					valueOld = this.getStrNumValue(key, valueNew);
				},
			});
		}
	}

	private updateElements(key: string, valueNew: string | number) {
		const elems = this.valueUsedKeys[key];

		for (const elem of elems) {
			this.updateElement(elem, String(valueNew));
		}
	}

	private updateElement(elem: HTMLElement, value: string): void {
		if (elem instanceof HTMLInputElement) {
			(elem as HTMLInputElement).value = String(value);
			return;
		}

		elem.innerText = value;
	}

	private getStrNumValue(key: string, value: string | number) {
		if (typeof this.state?.[key] === "number") {
			return Number(value);
		} else {
			return value;
		}
	}
}
