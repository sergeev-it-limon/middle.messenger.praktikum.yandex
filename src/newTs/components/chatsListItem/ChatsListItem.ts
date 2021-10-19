import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatsListItem.tmpl.js";
import "./chatsListItem.css";
import style from "./chatsListItem.css.json";
import { TChatItem } from "../chatsList/types";
import { eventBus } from "../../controllers/EventBus";
import { TChildren } from "../baseComponent/ChildrenService";
import { TActions } from "../baseComponent/ActionsService";

type TChatItemState = Omit<TChatItem, "isActive"> & { classLink: string };
type TChatItemProps = TChatItem;

export class ChatsListItem extends BaseComponent<
	TChatItemState,
	TChatItemProps
> {
	componentWillInit() {
		this.handleChatChange = this.handleChatChange.bind(this);
		this.handleChatChanged = this.handleChatChanged.bind(this);

		eventBus.subscribe("chatChanged", this.handleChatChanged);
	}

	private handleChatChanged({ chatIdNew }: { chatIdNew: number }): void {
		const isActive = this.state.chatId === chatIdNew;
		const classLinkActive = isActive ? style.link_active : "";

		console.log(classLinkActive);
		
		this.state.classLink = `${style.link} ${classLinkActive}`;
	}

	private handleChatChange(): void {
		eventBus.emit("chatChanged", { chatIdNew: this.state.chatId });
	}

	render(): HTMLElement {
		return htmlFromStr(
			template({ style: { root: style.root }, chatId: this.state.chatId })
		);
	}

	initState(): TChatItemState {
		return {
			alt: "",
			chatId: 0,
			classLink: style.link,
			name: "",
			previewText: "",
			src: "",
			timeLastMsg: "",
			unreadedMsgCnt: 0,
		};
	}

	propsToState(props: TChatItemProps) {
		const classLinkActive = `${style.link} ${style.link_active}`;
		const classLink = props.isActive ? classLinkActive : style.link;

		this.state.alt = props.alt;
		this.state.chatId = props.chatId;
		this.state.classLink = classLink;
		this.state.name = props.name;
		this.state.previewText = props.previewText;
		this.state.src = props.src;
		this.state.timeLastMsg = props.timeLastMsg;
		this.state.unreadedMsgCnt = props.unreadedMsgCnt;
	}

	initChildren(): TChildren {
		return {
			chatSelectableElem: htmlFromStr("<div>chatSelectableElem</div>"),
		};
	}

	initActions(): TActions {
		return {
			handleChatChange: this.handleChatChange,
		};
	}
}
