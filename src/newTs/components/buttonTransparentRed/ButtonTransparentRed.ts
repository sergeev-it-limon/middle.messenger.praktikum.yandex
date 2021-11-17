import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./buttonTransparentRed.tmpl.js";
import "./buttonTransparentRed.css";
import style from "./buttonTransparentRed.css.json";

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

export class ButtonTransparentRed extends BaseComponent<
	TButtonTransparentRedState,
	TButtonTransparentRedProps
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
}