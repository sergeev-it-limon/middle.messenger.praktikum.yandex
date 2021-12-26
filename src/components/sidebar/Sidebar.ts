import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sidebar.tmpl.js";
import style from "./sidebar.css";
import { ProfileLink } from "../profileLink";
import { SearchChatForm } from "../searchChatForm";
import { ChatsList } from "../chatsList";
import { ChatsController } from "../../controllers/chatsController";
import { eventBus } from "../../controllers/EventBus";
import { ButtonMain } from "../buttonMain";
import { ModalAddChat } from "../modalAddChat";

export class Sidebar extends BaseComponent {
	private chatsController = new ChatsController();
	private chatsList = new ChatsList(null);

	private updateChatsList() {
		this.chatsList.build(this.chatsController.getState());
	}

	private addChatOpenModal(): void {
		eventBus.emit("openAddChat", null);
	}

	componentWillInit() {
		if (this.chatsController.getState() === null) {
			this.chatsController.get();
		}
		eventBus.subscribe("chatsStateUpdated", this.updateChatsList.bind(this));
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		const profileLink = new ProfileLink(null);
		const searchChatForm = new SearchChatForm(null);
		const buttonAddChat = new ButtonMain({ text: "Добавить чат" });
		const modalAddChat = new ModalAddChat(null);

		profileLink.build(null);
		searchChatForm.build(null);
		this.chatsList.build(this.chatsController.getState());
		buttonAddChat.build({ handleClick: this.addChatOpenModal });
		modalAddChat.build(null);

		return {
			profileLink: profileLink.ref,
			searchChatForm: searchChatForm.ref,
			chatsList: this.chatsList.ref,
			buttonAddChat: buttonAddChat.ref,
			modalAddChat: modalAddChat.ref,
		};
	}
}
