import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
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

export class ButtonTransparent extends BaseComponent<
	TButtonTransparentState,
	TButtonTransparentProps
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
}
