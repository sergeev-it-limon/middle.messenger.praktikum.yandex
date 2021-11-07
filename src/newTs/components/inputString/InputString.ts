import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import "./inputString.css";
import style from "./inputString.css.json";
import { template } from "./inputString.tmpl.js";

type TInputStringState = {
	inputStringClassName: string;
	labelClassName: string;
	labelText: string;
	inputClassName: string;
	inputName: string;
	inputType: string;
	defaultValue: string;
};

type TInputStringProps = {
	labelText: string;
	inputName: string;
	inputType: string;
	defaultValue: string;
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
			defaultValue: this.props.defaultValue,
			inputClassName: style.input,
			inputName: this.props.inputName,
			inputStringClassName: style.inputString,
			inputType: this.props.inputType,
			labelClassName: style.label,
			labelText: this.props.labelText,
		};
	}

	propsToState(): void {
		this.state.defaultValue = this.props.defaultValue;
		this.state.inputName = this.props.inputName;
		this.state.inputType = this.props.inputType;
		this.state.labelText = this.props.labelText;
	}
}
