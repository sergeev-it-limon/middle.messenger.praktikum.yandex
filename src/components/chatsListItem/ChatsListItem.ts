import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsListItem.tmpl.js";
import style from "./chatsListItem.css";
import { TChatItem } from "../chatsList/types";
import { TChildren } from "../baseComponent/ChildrenService";
import { ChatSelectableElem } from "../chatSelectableElem";
import { Link } from "../link";
import { getClassName } from "../../utils/getClassName";

type TChatItemProps = TChatItem;

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
		return `/selectedChat/${this.props.chatId}`;
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
		const { chatId, ...otherProps } = this.props;

		this.link.update({
			href: this.getHref(),
			className: this.getLinkClassName(),
		});

		this.chatSelectableElem.update(otherProps);
	}
}
