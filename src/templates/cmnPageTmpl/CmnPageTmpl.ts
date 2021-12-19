import { BaseComponent, TChildren } from "../../components/baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./cmnPageTmpl.tmpl.js";
import style from "./cmnPageTmpl.css";

type TCmnPageTmplState = {
	rootClassName: string;
};

type TCmnPageTmplBuildCtx = {
	content: Node;
};

export class CmnPageTmpl extends BaseComponent<
	TCmnPageTmplState,
	null,
	TCmnPageTmplBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TCmnPageTmplState {
		return {
			rootClassName: style.root,
		};
	}

	initChildren(): TChildren {
		return {
			content: this.buildContext.content,
		};
	}
}
