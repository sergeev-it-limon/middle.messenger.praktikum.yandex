import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
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
		return {
			inputStringWithoutId: htmlFromStr("<input />"),
			buttonMain: htmlFromStr("<button>submit</button>"),
		};
	}
}
