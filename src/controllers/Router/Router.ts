import { TParams } from ".";
import { Route } from "./Route";
import { TGetComponent, TPathname } from "./types";

export class Router {
	/** Инстанс роутера (чтобы использовать как синглтон) */
	private static instance: Router | null = null;

	/** Роуты приложения */
	private routes: Route[];
	/** Селектор тэга в dom-дереве, куда будет рендерится приложение */
	private rootQuery: string;
	/** Экзепляр истории с которым работает роутер */
	private history: History;
	/** Текущий роут приложения */
	private currentRoute: Route | null;

	constructor(rootQuery?: string) {
		if (Router.instance !== null) {
			return Router.instance;
		}
		if (rootQuery === undefined) {
			throw new Error("rootQuery is not defined");
		}

		this.routes = [];
		this.history = window.history;
		this.currentRoute = null;
		this.rootQuery = rootQuery;

		Router.instance = this;
	}

	public destruct(): void {
		Router.instance = null;
	}

	public use(pathname: TPathname, getComponent: TGetComponent): Router {
		const route = new Route({
			pathname,
			getComponent,
			rootQuery: this.rootQuery,
		});

		this.routes.push(route);
		return this;
	}

	public start(): void {
		window.onpopstate = () => {
			this.onRoute(document.location.pathname);
		};

		this.onRoute(document.location.pathname);
	}

	public go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this.onRoute(pathname);
	}

	public back(): void {
		this.history.back();
	}

	public forward(): void {
		this.history.forward();
	}

	public getRoute(pathname: TPathname): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}

	public getParams(): TParams {
		return this.currentRoute?.getParams();
	}

	private onRoute(pathname: TPathname): void {
		const route = this.getRoute(pathname);

		if (route === undefined) {
			console.error(`can\'not find route for pathname: ${pathname}`);
			return;
		}

		if (this.currentRoute && !this.currentRoute.match(pathname)) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.navigate(pathname);
	}
}
