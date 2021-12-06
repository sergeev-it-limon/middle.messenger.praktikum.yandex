import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./labeledTextLine.tmpl.js";
import style from "./labeledTextLine.css";

type TLabeledTextLineState = {
	rootClassName: string;
	textClassName: string;
	labelText: string;
	mainText: string;
};

type TLabeledTextLineProps = {
	label: string;
	value: string;
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
			labelText: this.props.label,
			mainText: this.props.value,
		};
	}

	propsToState(): void {
		this.state.labelText = this.props.label;
		this.state.mainText = this.props.value;
	}
}
