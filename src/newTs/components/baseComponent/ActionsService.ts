import { getElemsByDataset } from "./getElemsByDataset";

const ACTIONS_ATTR = "[data-actions]";

type TAction = (e: Event) => void;
export type TActions = { [key: string]: TAction };

/** Сервис, отвечающий за привязку экшнов к тэгам компонента */
export class ActionsService {
	/** Экшны, которые надо привязывать */
	private readonly actions: TActions;

	constructor(actions: TActions) {
		this.actions = actions;
	}

	/** Привязываем экшны к тэгам. К одному тэгу можно привязать экшны только одного типа.
	 * Пример атрибута: data-actions="click:onClick,logger".
	 * */
	public bindActions(ref: HTMLElement): void {
		const elemsByActionsGroups = getElemsByDataset(ref, ACTIONS_ATTR);
		const typesNamesRelations = Object.keys(elemsByActionsGroups);

		for (const typeNames of typesNamesRelations) {
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
		for (const elem of elems) {
			this.addEventListenersForElemByType(actionType, elem, actionNames);
		}
	}

	private addEventListenersForElemByType(
		actionType: string,
		elem: HTMLElement,
		actionNames: string[]
	) {
		for (const actionName of actionNames) {
			elem.addEventListener(actionType, this.actions[actionName]);
		}
	}
}
