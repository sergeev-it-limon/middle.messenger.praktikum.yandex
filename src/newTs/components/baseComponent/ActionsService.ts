import { getElemsByDataset } from "./getElemsByDataset";

const ACTIONS_ATTR = "[data-actions]";

type TAction = (e: Event) => void;
export type TActions = { [key: string]: TAction };

/** Сервис, отвечающий за привязку экшнов к тэгам компонента */
export class ActionsService {
	/** Ссылка на элемент, в котором надо делать привязку экшнов */
	private readonly ref: HTMLElement;

	/** Экшны, которые надо привязывать */
	private readonly actions: TActions;

	constructor(ref: HTMLElement, actions: TActions) {
		this.ref = ref;
		this.actions = actions;
	}

	/** Привязываем экшны к тэгам. К одному тэгу можно привязать экшны только одного типа.
	 * Пример атрибута: data-actions="click:onClick,logger".
	 * */
	public bindActions() {
		const elemsByActionsGroups = getElemsByDataset(this.ref, ACTIONS_ATTR);
		const typesNamesRelations = Object.keys(elemsByActionsGroups);

		for (let typeNames of typesNamesRelations) {
			const elems = elemsByActionsGroups[typeNames];
			const [actionType, actionNamesStr] = typeNames.split(":");
			const actionNames = actionNamesStr.split(",");

			this.addEventListenersForElemsByType(actionType, elems, actionNames);
		}
	}

	private addEventListenersForElemsByType(
		actionType: string,
		elems: HTMLElement[],
		actionNames: string[]
	) {
		for (let elem of elems) {
			this.addEventListenersForElemByType(actionType, elem, actionNames);
		}
	}

	private addEventListenersForElemByType(
		actionType: string,
		elem: HTMLElement,
		actionNames: string[]
	) {
		for (let actionName of actionNames) {
			elem.addEventListener(actionType, this.actions[actionName]);
		}
	}
}
