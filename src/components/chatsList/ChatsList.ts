import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsList.tmpl.js";
import style from "./chatsList.css";
import { ChatsListItem } from "../chatsListItem";
import { ChatsController } from "../../controllers/chatsController";
import { TChat } from "../../controllers/chatsController/types";

type TChatsListBuildCtx = TChat[] | null;

export class ChatsList extends BaseComponent<null, null, TChatsListBuildCtx> {
	private chatsData: TChat[] | null;

	componentWillInit(): void {
		const chats = new ChatsController();
		this.chatsData = chats.getChatList();
		if (this.chatsData === null) {
			chats.get();
		}
	}

	render(): HTMLElement {
		return htmlFromStr(
			template({
				style,
				itemIds: this.buildContext?.map((item) => item.id) ?? [],
			})
		);
	}

	initChildren(): TChildren {
		return (
			this.buildContext?.reduce<TChildren>((items, chatData) => {
				const chatsListItem = new ChatsListItem(chatData);
				chatsListItem.build(null);
				items[`item_${chatData.id}`] = chatsListItem.ref;

				return items;
			}, {}) ?? {}
		);
	}
}
