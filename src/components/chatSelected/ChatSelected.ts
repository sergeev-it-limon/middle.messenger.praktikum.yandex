import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatSelected.tmpl.js";
import style from "./chatSelected.css";
import { getSelectedChatData } from "../../mocks/getSelectedChatData";
import { TMessage, TMessagesByDay } from "./chatSelectedTypes";
import { MessageImage } from "../messageImage";
import { Message } from "../message";
import { Divider } from "../divider";
import { SendMessageForm } from "../sendMessageForm";
import { ImageAvatar } from "../imageAvatar";
import { PopupChatActions } from "../popupChatActions";

type TMesMeta = {
	id: number;
	type: "myMessage" | "message" | "date";
	dateValue?: string;
};

export class ChatSelected extends BaseComponent {
	messagesData: TMessagesByDay[];

	getMeta(): TMesMeta[] {
		return this.messagesData.reduce<TMesMeta[]>((meta, mesByDay) => {
			meta.push(this.getDateMeta(mesByDay.timeDay));

			for (const mes of mesByDay.messages) {
				meta.push(this.getMessageMeta(mes));
			}

			return meta;
		}, []);
	}

	getMessageMeta(mes: TMessage): TMesMeta {
		const mesMeta: TMesMeta = { id: 0, type: "message" };

		if (mes.isMy) {
			mesMeta.type = "myMessage";
		} else {
			mesMeta.type = "message";
		}

		mesMeta.id = mes.id;

		return mesMeta;
	}

	getDateMeta(time: number): TMesMeta {
		const date = new Date(time);

		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		const dateStr = `${day}.${month}.${year}`;
		const dateStrNorm = dateStr.replace(/^\d(?=\.)|(?<=\.)\d(?=\.)/g, "0$&");

		return {
			type: "date",
			id: time,
			dateValue: dateStrNorm,
		};
	}

	mesDataToShallowArr(mesData: TMessagesByDay[]): TMessage[] {
		return mesData.reduce<TMessage[]>((acc, mesByDay) => {
			return acc.concat(mesByDay.messages);
		}, []);
	}

	getImgMesChild(mes: TMessage): HTMLElement {
		const imgMes = new MessageImage({
			src: mes.content.src ?? "",
			time: mes.content.time,
		});
		imgMes.build(null);
		return imgMes.ref;
	}

	getTextMesChild(mes: TMessage): HTMLElement {
		const textMes = new Message({
			text: mes.content.text ?? "",
			time: mes.content.time,
			type: mes.isMy ? "my" : "default",
		});
		textMes.build(null);
		return textMes.ref;
	}

	initSelectedChatData(): void {
		this.messagesData = getSelectedChatData();
	}

	getMessages(): TChildren {
		const mesDataShallow = this.mesDataToShallowArr(this.messagesData);

		const mesChildren = mesDataShallow.reduce<TChildren>((children, mes) => {
			switch (mes.type) {
				case "message":
					children[`message_${mes.id}`] = this.getTextMesChild(mes);
					break;
				case "image":
					children[`message_${mes.id}`] = this.getImgMesChild(mes);
					break;
			}

			return children;
		}, {});

		return mesChildren;
	}

	componentWillInit(): void {
		this.initSelectedChatData();
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
			sizeMod: "sm",
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
