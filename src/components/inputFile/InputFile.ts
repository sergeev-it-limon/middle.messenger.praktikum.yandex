import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./inputFile.tmpl.js";
import style from "./inputFile.css";

type TInputFileState = {
	text: string;
	accept: string;
	labelClassName: string;
	inputClassName: string;
};

type TInputFileProps = {
	text: string;
	accept: string;
};

export class InputFile extends BaseComponent<TInputFileState, TInputFileProps> {
	private handleChange() {
		this.ref.firstElementChild.setAttribute("disabled", "disabled");
		this.ref.setAttribute("disabled", "disabled");
		this.state.text = "Файл выбран";
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	protected initState(): TInputFileState {
		return {
			accept: this.props.accept,
			text: this.props.text,
			labelClassName: style.label,
			inputClassName: style.input,
		};
	}

	protected propsToState(): void {
		this.state.accept = this.props.accept;
		this.state.text = this.props.text;
	}

	protected initActions(): TActions {
		return {
			handleChange: this.handleChange.bind(this),
		};
	}
}
