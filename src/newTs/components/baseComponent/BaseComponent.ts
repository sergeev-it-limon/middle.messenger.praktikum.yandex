import { ActionsService, TActions } from "./ActionsService";
import { ChildrenService, TChildren } from "./ChildrenService";
import { TStateBase } from "./StateChangeEventBus";
import { StateService } from "./stateService";

export interface BaseComponent {
	/** Коллбэк, вызывающийся перед тем, как начется инициализация компонента */
	componentWillInit?(): void;
}

/** асбтрактый класс, реализующий основную логику работы компонентов */
export abstract class BaseComponent<
	TState extends TStateBase = TStateBase,
	TProps = null
> {
	private stateService: StateService<TState>;
	private actionsService: ActionsService;
	private childrenService: ChildrenService;

	/** Ссылка на элемент компонента */
	public ref: HTMLElement;

	/** Стейт компонента, связанный с тэгами */
	public get state(): TState {
		return this.stateService.state as TState;
	}

	/** Данные, полученные компонентом */
	protected props: TProps;

	/**
	 * Создает компонент, доступ к dom-элементу можно получить через ref,
	 * доступ к реактивному состоянию через state.
	 * @param props Данные на основе которых формируется состояние компонента.
	 */
	constructor(props: TProps) {
		this.props = props;
	}

	/** Собрать компонент */
	public build(): void {
		this.stateService = new StateService(this.initState());
		if (this.componentWillInit != null) {
			this.componentWillInit();
		}

		this.ref = this.render();

		this.actionsService = new ActionsService(this.ref, this.initActions());
		this.childrenService = new ChildrenService(this.ref, this.initChildren());

		this.stateService.bindState(this.ref);
		this.actionsService.bindActions();
		this.childrenService.bindChildren();

		this.update(this.props);
	}

	/** Метод, обновляющий состояние компонента, основываясь на новых пропсах */
	public update(props: TProps): void {
		this.props = props;
		this.propsToState();
	}

	/** Метод, возвращающий элемент компонента для переданных props */
	protected abstract render(): HTMLElement;

	/** Метод, возвращающий начальный стейт */
	protected initState(): TState {
		return {} as TState;
	}

	/** Метод, производящий обновление стейта на основе пропсов. */
	protected propsToState(): void {
		if (this.props == null) return;

		const isProps = Object.keys(this.props).length !== 0;

		if (this.state == null && isProps) {
			console.error(
				"props resieved for component, but propsToState is not implemented."
			);
		}
	}

	/** Метод, возвращающий дочерние компоненты */
	protected initChildren(): TChildren {
		return {};
	}

	/** Метод, возвращающий экшны для биндинга на тэги */
	protected initActions(): TActions {
		return {};
	}
}
