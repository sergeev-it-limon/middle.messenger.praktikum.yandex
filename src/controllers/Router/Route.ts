import { ParamsParser } from "./ParamsParser";
import { TGetComponent, TPathname } from "./types";

type TConfig = {
	pathname: TPathname;
	getComponent: TGetComponent;
	rootQuery: string;
};

export class Route {
	/** Путь текущего роута, если были параметры, то они будут заменены на конкретные значения */
	private pathnameCur: string | null;
	/** Текущий компонент */
	private component: HTMLElement | null;
	/** Функция для получения компонента в зависимости от параметров пути */
	private readonly getComponent: TGetComponent;
	/** Селектор для получения элемента dom-дерева в который надо рендерить компонент */
	private readonly rootQuery: string;
	/** парсер параметров */
	private readonly paramsParser: ParamsParser;

	constructor({ pathname, getComponent, rootQuery }: TConfig) {
		this.pathnameCur = null;
		this.component = null;
		this.getComponent = getComponent;
		this.rootQuery = rootQuery;
		this.paramsParser = new ParamsParser(pathname);
	}

	public navigate(pathname: string): void {
		if (this.match(pathname)) {
			this.pathnameCur = pathname;
			this.render();
		}
	}

	public leave(): void {
		if (this.component) {
			const root = this.getRoot();
			root?.removeChild(this.component);
		}
	}

	public match(pathname: string): boolean {
		return this.paramsParser.match(pathname);
	}

	private render() {
		if (this.pathnameCur === null) return;

		const params = this.paramsParser.getParams(this.pathnameCur);
		const component = this.getComponent(params);

		const root = this.getRoot();
		root?.appendChild(component);
	}

	private getRoot(): Element | null {
		return document.querySelector(this.rootQuery);
	}
}
