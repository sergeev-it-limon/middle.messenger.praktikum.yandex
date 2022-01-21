import { getClassName } from "../../utils/getClassName";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import style from "./inputString.css";
import { template } from "./inputString.tmpl.js";

type TInputStringState = {
	inputStringClassName: string;
	errorMessageClassName: string;
	labelClassName: string;
	label: string;
	inputClassName: string;
	inputName: string;
	inputType: string;
	value: string;
	errorMessage: string;
};

type TInputStringProps = {
	label: string;
	inputName: string;
	inputType: string;
	value: string;
	errorMessage?: string;
};

export class InputString extends BaseComponent<
	TInputStringState,
	TInputStringProps
> {
	private getInputStringClassName(): string {
		return getClassName(style.inputString, [
			style.error,
			Boolean(this.props.errorMessage),
		]);
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TInputStringState {
		return {
			value: this.props.value,
			inputClassName: style.input,
			inputName: this.props.inputName,
			inputStringClassName: this.getInputStringClassName(),
			inputType: this.props.inputType,
			labelClassName: style.label,
			label: this.props.label,
			errorMessage: "",
			errorMessageClassName: style.errorMessage,
		};
	}

	propsToState(): void {
		this.state.inputName = this.props.inputName;
		this.state.inputType = this.props.inputType;
		this.state.label = this.props.label;
		this.state.errorMessage = this.props.errorMessage ?? "";
		this.state.inputStringClassName = this.getInputStringClassName();
	}
}
