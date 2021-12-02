import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./chatSelectableElemPreviewText.tmpl.js";
import "./chatSelectableElemPreviewText.css";
import style from "./chatSelectableElemPreviewText.css.json";

type TChatSelectableElemPreviewTextState = {
	className: string;
	text: string;
};

type TChatSelectableElemPreviewTextProps = {
	text: string;
};

export class ChatSelectableElemPreviewText extends BaseComponent<
	TChatSelectableElemPreviewTextState,
	TChatSelectableElemPreviewTextProps
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TChatSelectableElemPreviewTextState {
		return {
			className: style.root,
			text: "",
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
	}
}
