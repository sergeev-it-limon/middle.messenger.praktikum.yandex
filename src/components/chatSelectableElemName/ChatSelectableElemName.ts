import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./chatSelectableElemName.tmpl.js";
import style from "./chatSelectableElemName.css";

type TChatSelectableElemNameState = {
	class: string;
	text: string;
};

type TChatSelectableElemNameProps = {
	text: string;
};

export class ChatSelectableElemName extends BaseComponent<
	TChatSelectableElemNameState,
	TChatSelectableElemNameProps
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TChatSelectableElemNameState {
		return {
			class: style.root,
			text: "",
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
	}
}
