import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonChatPopup } from "../buttonChatPopup";
import { List } from "../list";
import style from "./popupChatActionsContent.css";
import { template } from "./popupChatActionsContent.tmpl.js";
import addUserIcon from "./addUser.png";
import removeChatIcon from "./removeChat.png";
import removeUserIcon from "./removeUser.png";
import { eventBus } from "../../controllers/EventBus";
import { ChatsController } from "../../controllers/chatsController";
import { Router } from "../../controllers/Router";

export class PopupChatActionsContent extends BaseComponent {
	private router = new Router();
	private chatsController = new ChatsController();

	handleOpenAddUserModal(): void {
		eventBus.emit("openAddUser", null);
	}
	handleOpenRemoveUserModal(): void {
		eventBus.emit("openRemoveUser", null);
	}
	private async removeChat(): Promise<void> {
		const params = this.router.getParams();
		if (typeof params?.chatId !== "string") return;
		await this.chatsController.delete(Number(params.chatId));
		this.router.go("/messenger");
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const list = new List({
			ulClassName: style.list,
			liClassName: style.listItem,
		});

		const buttonAddUser = new ButtonChatPopup({
			imgAlt: "add user button",
			text: "Добавить пользователя",
			imgClassName: style.icon,
			imgSrc: addUserIcon,
			type: "button",
		});

		const buttonRemoveUser = new ButtonChatPopup({
			imgAlt: "remove user button",
			text: "Удалить пользователя",
			imgClassName: style.icon,
			imgSrc: removeUserIcon,
			type: "button",
		});

		const buttonRemoveChat = new ButtonChatPopup({
			imgAlt: "remove chat button",
			text: "Удалить чат",
			imgClassName: style.icon,
			imgSrc: removeChatIcon,
			type: "button",
		});

		buttonAddUser.build({
			handleClick: this.handleOpenAddUserModal.bind(this),
		});
		buttonRemoveUser.build({
			handleClick: this.handleOpenRemoveUserModal.bind(this),
		});
		buttonRemoveChat.build({
			handleClick: this.removeChat.bind(this),
		});

		list.build({
			items: [buttonAddUser.ref, buttonRemoveUser.ref, buttonRemoveChat.ref],
		});

		return { content: list.ref };
	}
}
