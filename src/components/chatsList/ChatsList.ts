import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsList.tmpl.js";
import style from "./chatsList.css";
import { getChatsData } from "../../mocks/getChatsData";
import { TChatItem } from "./types";
import { ChatsListItem } from "../chatsListItem";

export class ChatsList extends BaseComponent {
	private chatsData: TChatItem[];

	componentWillInit(): void {
		this.chatsData = getChatsData();
	}

	render(): HTMLElement {
		return htmlFromStr(
			template({
				style,
				itemIds: this.chatsData.map((item) => item.chatId),
			})
		);
	}

	initChildren(): TChildren {
		return this.chatsData.reduce<TChildren>((items, chatData) => {
			const chatsListItem = new ChatsListItem(chatData);
			chatsListItem.build(null);
			items[`item_${chatData.chatId}`] = chatsListItem.ref;

			return items;
		}, {});
	}
}
