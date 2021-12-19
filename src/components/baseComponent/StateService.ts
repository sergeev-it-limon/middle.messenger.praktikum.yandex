import { getElemsByDataset } from "./getElemsByDataset";
import { StateChangeEventBus, TStateBase } from "./StateChangeEventBus";

const STATE_ATTR = "[data-state]";

/** Сервис, реализующий логику работы со стейтом компонента и логику его обновления на связанных тэгах.
 * Объект стейта является реактивным, изменение свойств в нем будет вызывать ререндер связанных компонентов */
export class StateService {
	/** Реактивное состояние компонента, где каждое свойство может быть привязано к определенным тэгам */
	public state: TStateBase;
	private readonly stateChangeEventBus: StateChangeEventBus;

	constructor(defaultState: TStateBase) {
		this.state = defaultState;
		this.stateChangeEventBus = new StateChangeEventBus();
	}

	/** Связать стейт с соответствующими тэгами в переданном элементе */
	public bindState(ref: HTMLElement): void {
		if (this.state == null) return;

		this.bindValues(ref);
	}

	/** Добавляем сеттеры к тем значениям стейта, которые используются */
	private bindValues(ref: HTMLElement) {
		const stateAttrKeys = getElemsByDataset(ref, STATE_ATTR);

		// строки вида attr1:stateKey1,attr2:stateKey2,stateKey3,attr4:stateKey4
		const stateAttrStrArr = Object.keys(stateAttrKeys);

		for (const stateAttrStr of stateAttrStrArr) {
			const stateAttrArr = stateAttrStr.split(","); // получаем строки вида attr:stateKey и stateKey
			const elems = stateAttrKeys[stateAttrStr];

			for (const stateAttr of stateAttrArr) {
				const stateAttrEntry = stateAttr.split(":"); // получаем массив [attr, stateKey], либо [stateKey]

				for (const elem of elems) {
					if (stateAttrEntry.length === 2) {
						const [attr, stateKey] = stateAttrEntry;

						const stateValue = this.state[stateKey];

						if (stateValue == null) {
							console.error(
								`Can not find state for key ${stateKey} in data-state ${stateAttrStr}`
							);
						} else {
							elem.setAttribute(attr, stateValue.toString());
							this.stateChangeEventBus.subscribe(stateKey, (stateValue) => {
								elem.setAttribute(attr, stateValue.toString());
							});
						}
					} else if (stateAttrEntry.length === 1) {
						const [stateKey] = stateAttrEntry;
						const stateValue = this.state[stateKey];

						if (stateValue == null) {
							console.error(
								`Can not find state for key ${stateKey} in data-state ${stateAttrStr}`
							);
						} else {
							elem.innerText = stateValue.toString();
							this.stateChangeEventBus.subscribe(stateKey, (stateValue) => {
								elem.innerText = stateValue.toString();
							});
						}
					}
				}
			}
			this.createReactiveState();
		}
	}

	private createReactiveState(): void {
		const stateKeys = Object.keys(this.state);

		for (const stateKey of stateKeys) {
			let valueOld = this.state[stateKey];
			Object.defineProperty(this.state, stateKey, {
				set: (valueNew: typeof valueOld) => {
					if (valueNew !== valueOld) {
						this.stateChangeEventBus.emit(stateKey, valueNew);
					}

					valueOld = this.getStrNumValue(stateKey, valueNew);
				},
				get: () => valueOld,
			});
		}
	}

	private getStrNumValue(key: string, value: string | number) {
		if (typeof this.state?.[key] === "number") {
			return Number(value);
		} else {
			return value;
		}
	}
}
