import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsListItem.tmpl.js";
import style from "./chatsListItem.css";
import { TChatItem } from "../chatsList/types";
import { TChildren } from "../baseComponent/ChildrenService";
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
		this.chatSelectableElem.build(null);

		return {
			chatSelectableElem: this.chatSelectableElem.ref,
		};
	}

	propsToState(): void {
		const { chatId, ...otherProps } = this.props;

		this.state.href = `/selectedChat/${chatId}`;

		const classLinkActive = `${style.link} ${style.link_active}`;
		const isActive = this.state.href === location.pathname;
		const classLink = isActive ? classLinkActive : style.link;

		this.state.classLink = classLink;

		this.chatSelectableElem.update(otherProps);
	}
}
