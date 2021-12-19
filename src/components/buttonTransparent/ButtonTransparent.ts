import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./buttonTransparent.tmpl.js";
import style from "./buttonTransparent.css";
import { getClassName } from "../../utils/getClassName";

type TButtonTransparentState = {
	rootClassName: string;
	text: string;
	type: "button" | "submit";
};

type TButtonTransparentProps = {
	text: string;
	className?: string;
	type: "button" | "submit";
};

type TButtonTransparentBuildCtx = {
	handleClick: (e: Event) => void;
} | null;

export class ButtonTransparent extends BaseComponent<
	TButtonTransparentState,
	TButtonTransparentProps,
	TButtonTransparentBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TButtonTransparentState {
		return {
			rootClassName: getClassName(style.root, this.props.className),
			text: this.props.text,
			type: this.props.type,
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
		this.state.type = this.props.type;
		this.state.rootClassName = getClassName(style.root, this.props.className);
	}

	initActions(): TActions {
		const actions: TActions = {};

		if (this.buildContext?.handleClick != null) {
			actions.handleClick = this.buildContext.handleClick;
		}

		return actions;
	}
}
