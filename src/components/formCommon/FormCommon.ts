import { getClassName } from "../../utils/getClassName";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import style from "./formCommon.css";
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
	bottom: Node;
	handleSubmit?: (e: SubmitEvent) => void;
	handleFocusIn?: (e: FocusEvent) => void;
	handleFocusOut?: (e: FocusEvent) => void;
	handleInput?: (e: InputEvent) => void;
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
		this.state.rootClassName = getClassName(
			style.root,
			this.props.formClassName
		);
	}

	initActions(): TActions {
		const actions: TActions = {};

		if (typeof this.buildContext.handleSubmit === "function") {
			actions.handleSubmit = this.buildContext.handleSubmit;
		}
		if (typeof this.buildContext.handleInput === "function") {
			actions.handleInput = this.buildContext.handleInput;
		}
		if (typeof this.buildContext.handleFocusIn === "function") {
			actions.handleFocusIn = this.buildContext.handleFocusIn;
		}
		if (typeof this.buildContext.handleFocusOut === "function") {
			actions.handleFocusOut = this.buildContext.handleFocusOut;
		}

		return actions;
	}
}
