import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./buttonTransparent.tmpl.js";
import "./buttonTransparent.css";
import style from "./buttonTransparent.css.json";

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
		return {
			handleClick: this.buildContext?.handleClick ?? (() => {}),
		};
	}
}
