import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sendMessageForm.tmpl.js";
import { getFormEntries } from "../../utils/getFormEntries";
import style from "./sendMessageForm.css";
import { InputSendMessage } from "../inputSendMessage";
import { ButtonSubmitSendMessageForm } from "../buttonSubmitSendMessageForm";
import { PopupAddFile } from "../popupAddFile";
import { ChatsController } from "../../controllers/chatsController";

export class SendMessageForm extends BaseComponent {
	private chatsController = new ChatsController();

	handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const { message } = getFormEntries<{ message: string }>(form);
		this.chatsController.sendMessage(message);
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		const inputSendMessage = new InputSendMessage({ name: "message" });
		const buttonSubmitSendMessageForm = new ButtonSubmitSendMessageForm(null);
		const popupAddFile = new PopupAddFile(null);

		inputSendMessage.build(null);
		buttonSubmitSendMessageForm.build(null);
		popupAddFile.build(null);

		return {
			popupAddFile: popupAddFile.ref,
			inputSendMessage: inputSendMessage.ref,
			buttonSubmitSendMessageForm: buttonSubmitSendMessageForm.ref,
		};
	}

	initActions(): TActions {
		return {
			handleSubmit: this.handleSubmit.bind(this),
		};
	}
}
