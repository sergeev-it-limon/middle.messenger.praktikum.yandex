import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsListItem.tmpl.js";
import style from "./chatsListItem.css";
import { TChildren } from "../baseComponent/ChildrenService";
import { ChatSelectableElem } from "../chatSelectableElem";
import { Link } from "../link";
import { getClassName } from "../../utils/getClassName";
import { TChat } from "../../controllers/chatsController/types";
import userAvatar from "../../asserts/userAvatar.png";
import { formatTime } from "../../utils/formatTime";

type TChatItemProps = TChat;

export class ChatsListItem extends BaseComponent<null, TChatItemProps> {
	private chatSelectableElem = new ChatSelectableElem({
		alt: "",
		name: "",
		previewText: "",
		src: "",
		timeLastMsg: "",
		unreadedMsgCnt: 0,
	});
	private link = new Link({ className: style.link, href: this.getHref() });

	private getHref() {
		return `/messenger/${this.props.id}`;
	}

	private getLinkClassName() {
		const isActive = this.getHref() === location.pathname;
		return getClassName(style.link, [style.link_active, isActive]);
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		this.chatSelectableElem.build(null);

		this.link.build({ content: this.chatSelectableElem.ref });
		this.link.update({
			className: this.getLinkClassName(),
			href: this.getHref(),
		});

		return {
			link: this.link.ref,
		};
	}

	propsToState(): void {
		this.link.update({
			href: this.getHref(),
			className: this.getLinkClassName(),
		});

		const time = new Date(this.props.last_message?.time ?? 0);
		const hours = time.getHours();
		const minutes = time.getMinutes();

		this.chatSelectableElem.update({
			alt: this.props.title,
			name: this.props.title,
			previewText: this.props.last_message?.content ?? "",
			src: this.props.avatar ?? userAvatar,
			timeLastMsg: formatTime(hours, minutes),
			unreadedMsgCnt: this.props.unread_count,
		});
	}
}
