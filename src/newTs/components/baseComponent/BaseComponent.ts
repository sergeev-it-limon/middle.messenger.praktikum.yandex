import { ActionsService, TActions } from "./ActionsService";
import { ChildrenService, TChildren } from "./ChildrenService";
import { StateService, TState as TStateBase } from "./stateService";

/** асбтрактый класс, реализующий основную логику работы компонентов */
export abstract class BaseComponent<TState extends TStateBase = null> {
	private stateService: StateService;
	private actionsService: ActionsService;
	private childrenService: ChildrenService;

	/** Ссылка на элемент компонента */
	public readonly ref: HTMLElement;

	/** Стейт компонента, связанный с тэгами */
	public get state(): TState {
		return this.stateService.state as TState;
	}

	/**
	 * Создает компонент, доступ к dom-элементу можно получить через ref,
	 * доступ к реактивному состоянию через state.
	 * @param state Дефолтный стейт компонента.
	 */
	constructor(state: TState = null as TState) {
		this.ref = this.render(state);

		this.stateService = new StateService(this.ref, state);
		this.actionsService = new ActionsService(this.ref, this.initActions());
		this.childrenService = new ChildrenService(this.ref, this.initChildren());

		this.stateService.bindState();
		this.actionsService.bindActions();
		this.childrenService.bindChildren();
	}

	/** Метод, возвращающий элемент компонента для переданных props */
	abstract render(state: TState): HTMLElement;

	/** Метод, возвращающий начальный стейт */

	/** Метод, возвращающий дочерние компоненты */
	protected initChildren(): TChildren {
		return {};
	}

	/** Метод, возвращающий экшны для биндинга на тэги */
	protected initActions(): TActions {
		return {};
	}
}
