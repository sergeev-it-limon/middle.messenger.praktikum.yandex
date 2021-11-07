import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { InputString } from "../inputString";
import "./modalAddRemoveUser.css";
import style from "./modalAddRemoveUser.css.json";
import { template } from "./modalAddRemoveUser.tmpl.js";

type TModalAddRemoveUserState = {
	outerWrapperClassName: string;
	closeElemClassName: string;
	rootClassName: string;
	headerClassName: string;
	headerText: string;
	inputClassName: string;
	submitClassName: string;
};

type TModalAddRemoveUserProps = {
	typeModal: "add" | "remove";
};

export class ModalAddRemoveUser extends BaseComponent<
	TModalAddRemoveUserState,
	TModalAddRemoveUserProps
> {
	private getButtonText() {
		let buttonText = "Тип не определен";

		if (this.props.typeModal === "add") {
			buttonText = "Добавить";
		} else if (this.props.typeModal === "remove") {
			buttonText = "Удалить";
		}

		return buttonText;
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TModalAddRemoveUserState {
		return {
			closeElemClassName: style.closeElem,
			headerClassName: style.header,
			headerText: "",
			inputClassName: style.input,
			outerWrapperClassName: `${style.outerWrapper} ${style.outerWrapper_open}`,
			rootClassName: style.root,
			submitClassName: style.submit,
		};
	}

	propsToState(): void {
		let headerText = "Тип модального окна не определен";

		if (this.props.typeModal === "add") {
			headerText = "Добавить пользователя";
		} else if (this.props.typeModal === "remove") {
			headerText = "Удалить пользователя";
		}

		this.state.headerText = headerText;
	}

	initChildren(): TChildren {
		const inputString = new InputString({
			defaultValue: "",
			inputName: "login",
			inputType: "input",
			labelText: "Логин",
		});

		const buttonMain = new ButtonMain({ text: this.getButtonText() });

		inputString.build(null);
		buttonMain.build(null);

		return {
			inputString: inputString.ref,
			buttonMain: buttonMain.ref,
		};
	}
}
