import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import "./chatSelectableElemName.css";
import style from "./chatSelectableElemName.css.json";

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
		const html = '<h2 data-state="class:class,text" ></h2>';
		return htmlFromStr(html);
	}

	initState(): TChatSelectableElemNameState {
		return {
			class: style.root,
			text: "",
		};
	}

	propsToState() {
		this.state.text = this.props.text;
	}
}
