import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import "./inputString.css";
import style from "./inputString.css.json";
import { template } from "./inputString.tmpl.js";

type TInputStringState = {
	inputStringClassName: string;
	labelClassName: string;
	label: string;
	inputClassName: string;
	inputName: string;
	inputType: string;
	value: string;
};

type TInputStringProps = {
	label: string;
	inputName: string;
	inputType: string;
	value: string;
};

export class InputString extends BaseComponent<
	TInputStringState,
	TInputStringProps
> {
	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TInputStringState {
		return {
			value: this.props.value,
			inputClassName: style.input,
			inputName: this.props.inputName,
			inputStringClassName: style.inputString,
			inputType: this.props.inputType,
			labelClassName: style.label,
			label: this.props.label,
		};
	}

	propsToState(): void {
		this.state.value = this.props.value;
		this.state.inputName = this.props.inputName;
		this.state.inputType = this.props.inputType;
		this.state.label = this.props.label;
	}
}
