import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsListItem.tmpl.js";
import "./chatsListItem.css";
import style from "./chatsListItem.css.json";
import { TChatItem } from "../chatsList/types";
import { eventBus } from "../../controllers/EventBus";
import { TChildren } from "../baseComponent/ChildrenService";
import { TActions } from "../baseComponent/ActionsService";
import { ChatSelectableElem } from "../chatSelectableElem";

type TChatItemState = {
	href: string;
	classLink: string;
};
type TChatItemProps = TChatItem;

export class ChatsListItem extends BaseComponent<
	TChatItemState,
	TChatItemProps
> {
	private chatSelectableElem = new ChatSelectableElem({
		alt: "",
		name: "",
		previewText: "",
		src: "",
		timeLastMsg: "",
		unreadedMsgCnt: 0,
	});

	componentWillInit(): void {
		this.handleChatChange = this.handleChatChange.bind(this);
		this.handleChatChanged = this.handleChatChanged.bind(this);

		eventBus.subscribe("chatChanged", this.handleChatChanged);
	}

	private handleChatChanged({ chatIdNew }: { chatIdNew: number }): void {
		const isActive = this.getId(this.state.href) === chatIdNew;
		const classLinkActive = isActive ? style.link_active : "";

		this.state.classLink = `${style.link} ${classLinkActive}`;
	}

	private handleChatChange(): void {
		eventBus.emit("chatChanged", { chatIdNew: this.getId(this.state.href) });
	}

	private getId(link: string): number {
		return Number(link.split("/")[2]);
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TChatItemState {
		return {
			href: "/selectedChat/0",
			classLink: style.link,
		};
	}

	initChildren(): TChildren {
		this.chatSelectableElem.build();

		return {
			chatSelectableElem: this.chatSelectableElem.ref,
		};
	}

	initActions(): TActions {
		return {
			handleChatChange: this.handleChatChange,
		};
	}

	propsToState(): void {
		const { chatId, isActive, ...otherProps } = this.props;

		const classLinkActive = `${style.link} ${style.link_active}`;
		const classLink = isActive ? classLinkActive : style.link;

		this.state.classLink = classLink;
		this.state.href = `/selectedChat/${chatId}`;

		this.chatSelectableElem.update(otherProps);
	}
}
