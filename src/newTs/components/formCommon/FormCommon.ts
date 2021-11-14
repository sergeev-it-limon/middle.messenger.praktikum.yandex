import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import "./formCommon.css";
import style from "./formCommon.css.json";
import { template } from "./formCommon.tmpl.js";

type TFormCommonState = {
	rootClassName: string;
	topClassName: string;
	bottomClassName: string;
};

type TFormCommonProps = {
	formClassName: string;
};

type TFormCommonBuildCtx = {
	top: Node;
	bottom: HTMLElement;
};

export class FormCommon extends BaseComponent<
	TFormCommonState,
	TFormCommonProps,
	TFormCommonBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		return {
			formTop: this.buildContext.top,
			formBottom: this.buildContext.bottom,
		};
	}

	initState(): TFormCommonState {
		return {
			bottomClassName: style.bottom,
			rootClassName: style.root,
			topClassName: style.top,
		};
	}

	propsToState(): void {
		this.state.rootClassName = `${style.root} ${
			this.props.formClassName ?? ""
		}`;
	}
}
