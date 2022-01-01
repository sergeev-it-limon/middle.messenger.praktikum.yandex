import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatSelected.tmpl.js";
import style from "./chatSelected.css";
// import { getSelectedChatData } from "../../mocks/getSelectedChatData";
// import { TMessagesByDay } from "./chatSelectedTypes";
// import { MessageImage } from "../messageImage";
import { Message } from "../message";
import { Divider } from "../divider";
import { SendMessageForm } from "../sendMessageForm";
import { ImageAvatar } from "../imageAvatar";
import { PopupChatActions } from "../popupChatActions";
import { TSizeMod } from "../imageAvatar/ImageAvatar";
import { ChatsController } from "../../controllers/chatsController";
import { Router } from "../../controllers/Router";
import { AuthController } from "../../controllers/authController";
import { eventBus } from "../../controllers/EventBus";
import { TMessage } from "../../controllers/chatsController/types";

type TMesMeta = {
	id: string;
	type: "myMessage" | "message" | "date";
	dateValue?: string;
};

type TBuildCtx = {
	messages: TMessage[] | null;
};

export class ChatSelected extends BaseComponent<null, null, TBuildCtx> {
	private authController = new AuthController();
	private router = new Router();
	private chatsController = new ChatsController();

	getMeta(): TMesMeta[] {
		return (
			this.buildContext.messages?.map<TMesMeta>((mes) => {
				return this.getMessageMeta(mes);
			}) ?? []
		);
	}

	getMessageMeta(mes: TMessage): TMesMeta {
		const mesMeta: TMesMeta = { id: "", type: "message" };

		if (this.isMy(mes)) {
			mesMeta.type = "myMessage";
		} else {
			mesMeta.type = "message";
		}

		mesMeta.id = this.getMesId(mes);

		return mesMeta;
	}

	private isMy(mes: TMessage) {
		const myId = this.authController.getState()?.id;
		return mes.user_id === myId;
	}

	getTextMesChild(mes: TMessage): HTMLElement {
		const textMes = new Message({
			text: mes.content ?? "",
			time: new Date(mes.time).getTime(),
			type: this.isMy(mes) ? "my" : "default",
		});
		textMes.build(null);
		return textMes.ref;
	}

	private getMesId(mes: TMessage) {
		return `${mes.user_id}${mes.chat_id}${mes.time}`;
	}

	getMessages(): TChildren {
		return (
			this.buildContext.messages?.reduce<TChildren>((children, mes) => {
				return {
					...children,
					[`message_${this.getMesId(mes)}`]: this.getTextMesChild(mes),
				};
			}, {}) ?? {}
		);
	}

	private async handleAuth(): Promise<void> {
		const { chatId = null } = this.router.getParams() ?? {};
		const userId = this.authController.getState()?.id;
		if (chatId === null || userId === undefined) return;

		await this.chatsController.initWsConnection(userId, Number(chatId));
		return this.chatsController.fetchAllMessages();
	}

	private handleMessageResived() {
		this.build({
			messages: this.sortMessages(this.chatsController.getMessages()),
		});
	}

	private sortMessages(messages: TMessage[]): TMessage[] {
		return messages.slice().sort((a, b) => {
			const timeA = new Date(a.time).getTime();
			const timeB = new Date(b.time).getTime();
			return timeA - timeB;
		});
	}

	componentWillInit(): void {
		eventBus.subscribe("authStateUpdated", this.handleAuth.bind(this));
		eventBus.subscribe("messageReceived", this.handleMessageResived.bind(this));
	}

	render(): HTMLElement {
		const messagesMeta = this.getMeta();

		return htmlFromStr(template({ style, messagesMeta }));
	}

	initChildren(): TChildren {
		const messages = this.getMessages();

		const dividerFooter = new Divider(null);
		const dividerHeader = new Divider(null);
		dividerFooter.build(null);
		dividerHeader.build(null);

		const sendMessageForm = new SendMessageForm(null);
		sendMessageForm.build(null);

		const imageAvatar = new ImageAvatar({
			alt: "avatar",
			sizeMod: TSizeMod.sm,
			src: "https://images.unsplash.com/photo-1616213320857-b5c3669e472e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
		});
		imageAvatar.build(null);

		const popupChatActions = new PopupChatActions(null);
		popupChatActions.build(null);

		return {
			dividerHeader: dividerHeader.ref,
			dividerFooter: dividerFooter.ref,
			sendMessageForm: sendMessageForm.ref,
			imageAvatar: imageAvatar.ref,
			popupChatActions: popupChatActions.ref,
			...messages,
		};
	}
}
