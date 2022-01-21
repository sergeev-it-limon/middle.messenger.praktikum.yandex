import { ChatsController } from "../../controllers/chatsController";
import { TAddChatPayload } from "../../controllers/chatsController/types";
import { eventBus } from "../../controllers/EventBus";
import { getFormEntries } from "../../utils/getFormEntries";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { InputString } from "../inputString";
import style from "./modalAddChat.css";
import { template } from "./modalAddChat.tmpl.js";

type TModalAddChatState = {
	outerWrapperClassName: string;
	closeElemClassName: string;
	rootClassName: string;
	headerClassName: string;
	headerText: string;
	inputClassName: string;
	submitClassName: string;
};

export class ModalAddChat extends BaseComponent<TModalAddChatState> {
	private chatsController = new ChatsController();

	private handleClose(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_close}`;
	}

	private handleOpen(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_open}`;
	}

	private async handleSubmit(e: SubmitEvent): Promise<void> {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries<TAddChatPayload>(form);
		await this.chatsController.post(formData);
		this.handleClose();
	}

	componentWillInit(): void {
		eventBus.subscribe("openAddChat", this.handleOpen.bind(this));
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TModalAddChatState {
		return {
			closeElemClassName: style.closeElem,
			headerClassName: style.header,
			headerText: "",
			inputClassName: style.input,
			outerWrapperClassName: `${style.outerWrapper} ${style.outerWrapper_close}`,
			rootClassName: style.root,
			submitClassName: style.submit,
		};
	}

	propsToState(): void {
		this.state.headerText = "Добавить чат";
	}

	initChildren(): TChildren {
		const inputString = new InputString({
			value: "",
			inputName: "title",
			inputType: "input",
			label: "Название чата",
		});

		const buttonMain = new ButtonMain({ text: "Добавить" });

		inputString.build(null);
		buttonMain.build(null);

		return {
			inputString: inputString.ref,
			buttonMain: buttonMain.ref,
		};
	}

	initActions(): TActions {
		return {
			handleClose: this.handleClose.bind(this),
			handleSubmit: this.handleSubmit.bind(this),
		};
	}
}
