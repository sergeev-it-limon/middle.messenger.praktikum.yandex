import { Router } from "../../controllers/Router";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { template } from "./link.tmpl.js";

type TLinkState = {
	className: string;
};

type TLinkProps = {
	className: string;
	href: string;
};

type TLinkBuildCtx = {
	content: HTMLElement;
};

export class Link extends BaseComponent<TLinkState, TLinkProps, TLinkBuildCtx> {
	private router = new Router();

	private handleClick() {
		this.router.go(this.props.href);
	}

	render() {
		return htmlFromStr(template());
	}

	initState(): TLinkState {
		return {
			className: this.props.className,
		};
	}

	propsToState(): void {
		this.state.className = this.props.className;
	}

	initChildren(): TChildren {
		return {
			content: this.buildContext.content,
		};
	}

	initActions(): TActions {
		return {
			handleClick: this.handleClick.bind(this),
		};
	}
}
