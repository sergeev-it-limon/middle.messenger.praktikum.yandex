import { BaseComponent } from "../baseComponent";
import { template } from "./inputSendMessage.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";
import style from "./inputSendMessage.css";

type TInputSendMessageState = {
	name: string;
};
type TInputSendMessageProps = {
	name: string;
};

export class InputSendMessage extends BaseComponent<
	TInputSendMessageState,
	TInputSendMessageProps
> {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TInputSendMessageState {
		return {
			name: "",
		};
	}

	propsToState(): void {
		this.state.name = this.props.name;
	}
}
