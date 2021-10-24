import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sendMessageForm.tmpl.js";
import { getFormEntries } from "../../utils/getFormEntries";
import "./sendMessageForm.css";
import style from "./sendMessageForm.css.json";
import { InputSendMessage } from "../inputSendMessage";
import { ButtonSubmitSendMessageForm } from "../buttonSubmitSendMessageForm";
// import { InputSendMessage } from "../inputSendMessage";
// import { ButtonSubmitSendMessageForm } from "../buttonSubmitSendMessageForm";
// import { PopupAddFile } from "../popupAddFile";

export class SendMessageForm extends BaseComponent {
	handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log("Сабмит формы ввода сообщения");
		console.log(formData);
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		const inputSendMessage = new InputSendMessage({ name: "message" });
		const buttonSubmitSendMessageForm = new ButtonSubmitSendMessageForm(null);

		inputSendMessage.build();
		buttonSubmitSendMessageForm.build();

		return {
			popupAddFile: htmlFromStr("<div>popupAddFile</div>"),
			inputSendMessage: inputSendMessage.ref,
			buttonSubmitSendMessageForm: buttonSubmitSendMessageForm.ref,
		};
	}

	initActions(): TActions {
		return {
			handleSubmit: this.handleSubmit,
		};
	}
}
