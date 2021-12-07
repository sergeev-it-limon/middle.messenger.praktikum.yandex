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

export class PopupChatActionsContent extends BaseComponent {
	handleOpenAddUserModal(): void {
		eventBus.emit("openAddUser", null);
	}
	handleOpenRemoveUserModal(): void {
		eventBus.emit("openRemoveUser", null);
	}
	handleOpenRemoveChatModal(): void {
		eventBus.emit("openRemoveChat", null);
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
			handleClick: this.handleOpenRemoveChatModal.bind(this),
		});

		list.build({
			items: [buttonAddUser.ref, buttonRemoveUser.ref, buttonRemoveChat.ref],
		});

		return { content: list.ref };
	}
}