import { BaseComponent } from "../components/baseComponent";
import { htmlFromStr } from "../utils/htmlFrom";
import { template } from "./buttonMain.tmpl.js";
import "./buttonMain.css";

type TButtonMainState = {
	text: string;
	rootClassName: string;
};

type TButtonMainProps = {
	text: string;
};

export class ButtonMain extends BaseComponent<
	TButtonMainState,
	TButtonMainProps
> {
	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TButtonMainState {
		return {
			text: this.props.text,
			rootClassName: "",
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
	}
}
