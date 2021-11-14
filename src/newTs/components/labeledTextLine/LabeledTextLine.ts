import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./labeledTextLine.tmpl.js";
import "./labeledTextLine.css";
import style from "./labeledTextLine.css.json";

type TLabeledTextLineState = {
	rootClassName: string;
	textClassName: string;
	labelText: string;
	mainText: string;
};

type TLabeledTextLineProps = {
	labelText: string;
	mainText: string;
};

export class LabeledTextLine extends BaseComponent<
	TLabeledTextLineState,
	TLabeledTextLineProps
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TLabeledTextLineState {
		return {
			rootClassName: style.root,
			textClassName: style.text,
			labelText: this.props.labelText,
			mainText: this.props.mainText,
		};
	}

	propsToState(): void {
		this.state.labelText = this.props.labelText;
		this.state.mainText = this.props.mainText;
	}
}
