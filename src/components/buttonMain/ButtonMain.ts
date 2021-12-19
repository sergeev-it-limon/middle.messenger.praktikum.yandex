import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./buttonMain.tmpl.js";
import style from "./buttonMain.css";

type TButtonMainState = {
	rootClassName: string;
	text: string;
};

type TButtonMainProps = {
	text: string;
};

export class ButtonMain extends BaseComponent<
	TButtonMainState,
	TButtonMainProps
> {
	protected render(): HTMLElement {
		console.log(template());
		return htmlFromStr(template());
	}

	initState(): TButtonMainState {
		return {
			rootClassName: style.root,
			text: this.props.text,
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
	}
}
