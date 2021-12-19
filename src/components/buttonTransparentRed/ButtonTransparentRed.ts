import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./buttonTransparentRed.tmpl.js";
import style from "./buttonTransparentRed.css";

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
		const addClassName = this.props.className ?? "";

		return {
			rootClassName: `${style.root} ${addClassName}`,
			text: this.props.text,
			type: this.props.type,
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
		this.state.type = this.props.type;

		const addClassName = this.props.className ?? "";
		this.state.rootClassName = `${style.root} ${addClassName}`;
	}

	initActions(): TActions {
		const actions: TActions = {};

		if (this.buildContext?.handleClick != null) {
			actions.handleClick = this.buildContext.handleClick;
		}

		return actions;
	}
}
