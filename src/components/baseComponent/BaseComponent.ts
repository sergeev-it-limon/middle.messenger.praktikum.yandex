import { ActionsService, TActions } from "./ActionsService";
import { ChildrenService, TChildren } from "./ChildrenService";
import { LifeCycleEventBus } from "./LifeCycleEventBus";
import { TStateBase } from "./StateChangeEventBus";
import { StateService } from "./stateService";

type TStateComponent = TStateBase | null;

export interface BaseComponent {
	/** Коллбэк, вызывающийся перед тем, как начется инициализация компонента */
	componentWillInit?(): void;
}

/** асбтрактый класс, реализующий основную логику работы компонентов */
export abstract class BaseComponent<
	TState extends TStateComponent = null,
	TProps = null,
	TBuildContext = null
> {
	private stateService: StateService;
	private actionsService: ActionsService;
	private childrenService: ChildrenService;

	/** Позволяет скрыть компонент или снова показать */
	private _isVisible = true;
	public get isVisible(): boolean {
		return this._isVisible;
	}

	private set isVisible(value: boolean) {
		const styleEntries = this.getStyleEntries();
		const displayIndex = styleEntries.findIndex(([key]) => key === "display");

		if (displayIndex === -1) {
			if (!value) {
				styleEntries.push(["display", "none"]);
			}
		} else {
			if (value && styleEntries[displayIndex][1] === "none") {
				styleEntries.splice(displayIndex, 1);
			} else {
				styleEntries[displayIndex][1] = "none";
			}
		}

		const styleNew = this.styleEntriesToStr(styleEntries);
		this.ref.setAttribute("style", styleNew);

		this._isVisible = false;
	}

	/** Ссылка на предыдущий элемент, надо для ребилда, чтобы сделать replaceWith */
	private prevRef: HTMLElement;

	/** Ссылка на элемент компонента */
	public ref: HTMLElement;

	/** Стейт компонента, связанный с тэгами */
	public get state(): TState {
		return this.stateService.state as TState;
	}

	/** Данные, полученные компонентом */
	public props: TProps;

	/** Данные, с которыми последний раз запускался билд компонента */
	protected buildContext: TBuildContext;

	private eventBus: LifeCycleEventBus<TProps>;

	/**
	 * Создает компонент, доступ к dom-элементу можно получить через ref,
	 * доступ к реактивному состоянию через state.
	 * @param props Данные на основе которых формируется состояние компонента.
	 */
	constructor(props: TProps) {
		this.props = props;
	}

	/** Показать элемент (добавить в аттрибут syle значение display: block;) */
	public show(): void {
		this.isVisible = true;
	}

	/** Скрыть элемент (добавить в аттрибут syle значение display: none;) */
	public hide(): void {
		this.isVisible = false;
	}

	private getStyleEntries(): string[][] {
		const style = this.ref.getAttribute("style") ?? "";
		return style
			.split(";")
			.filter((value) => value != "")
			.map((style) => style.split(": "));
	}

	private styleEntriesToStr(entries: string[][]): string {
		return entries
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ")
			.concat(";");
	}

	/** Собрать компонент */
	public build(ctx: TBuildContext): void {
		this.buildContext = ctx;
		this.initEventBus();
		this.eventBus.emit("componentWillInit", null);
	}

	private initEventBus(): void {
		this.eventBus = new LifeCycleEventBus<TProps>();

		this.eventBus.subscribe(
			"componentWillInit",
			this._componentWillInit.bind(this)
		);
		this.eventBus.subscribe("initServices", this.initServices.bind(this));
		this.eventBus.subscribe("saveRef", this.saveRef.bind(this));
		this.eventBus.subscribe("render", this._render.bind(this));
		this.eventBus.subscribe("bindServices", this.bindServices.bind(this));
		this.eventBus.subscribe("update", this._update.bind(this));
		this.eventBus.subscribe("remount", this.remount.bind(this));
	}

	private _componentWillInit(): void {
		if (this.componentWillInit != null) {
			this.componentWillInit();
		}

		this.eventBus.emit("initServices", null);
	}

	private initServices(): void {
		this.stateService = new StateService(this.initState() ?? {});
		this.actionsService = new ActionsService(this.initActions());
		this.childrenService = new ChildrenService(this.initChildren());

		this.eventBus.emit("saveRef", null);
	}

	private saveRef(): void {
		if (this.ref != null) {
			this.prevRef = this.ref;
		}

		this.eventBus.emit("render", null);
	}

	private _render(): void {
		this.ref = this.render();
		this.eventBus.emit("bindServices", null);
	}

	private bindServices() {
		this.stateService.bindState(this.ref);
		this.actionsService.bindActions(this.ref);
		this.childrenService.bindChildren(this.ref);

		this.eventBus.emit("update", this.props);
	}

	private _update(props: TProps): void {
		this.update(props);
		this.eventBus.emit("remount", null);
	}

	private remount(): void {
		if (this.prevRef == null) return;
		this.prevRef.replaceWith(this.ref);
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
