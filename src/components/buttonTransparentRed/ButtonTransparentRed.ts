import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./buttonTransparentRed.tmpl.js";
import style from "./buttonTransparentRed.css";
import { getClassName } from "../../utils/getClassName";

type TButtonTransparentRedState = {
	rootClassName: string;
	text: string;
	type: "button" | "submit";
};

type TButtonTransparentRedProps = {
	text: string;
	className?: string;
	type: "button" | "submit";
};

type TButtonTransparentRedBuildCtx = {
	handleClick: (e: Event) => void;
} | null;

export class ButtonTransparentRed extends BaseComponent<
	TButtonTransparentRedState,
	TButtonTransparentRedProps,
	TButtonTransparentRedBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TButtonTransparentRedState {
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
