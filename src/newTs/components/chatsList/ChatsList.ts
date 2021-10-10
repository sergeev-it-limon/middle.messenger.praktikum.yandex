import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsList.tmpl";
import "./chatsList.css";
import style from "./chatsList.css.json";
import { getChatsData } from "../../mocks/getChatsData";
import { TChatItem } from "./types";

export class ChatsList extends BaseComponent {
	private chatsData: TChatItem[];

	render() {
		this.chatsData = getChatsData();

		return htmlFromStr(
			template({
				style,
				itemIds: this.chatsData.map((item) => item.chatId),
			})
		);
	}

	initChildren(): TChildren {
		return this.chatsData.reduce((items, chatData) => {
			items[`item_${chatData.chatId}`] = htmlFromStr(
				`<div>chat ${chatData.name}</div>`
			);

			return items;
		}, {});
	}
}
