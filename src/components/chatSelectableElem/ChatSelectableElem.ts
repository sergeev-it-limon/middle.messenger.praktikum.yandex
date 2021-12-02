import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatSelectableElem.tmpl.js";
import "./chatSelectableElem.css";
import style from "./chatSelectableElem.css.json";
import { ImageAvatar } from "../imageAvatar";
import { TextLineClamp } from "../textLineClamp";
import { ChatSelectableElemName } from "../chatSelectableElemName";
import { ChatSelectableElemPreviewText } from "../chatSelectableElemPreviewText";

type TChatSelectableElemProps = {
	src: string;
	alt: string;
	name: string;
	previewText: string;
	timeLastMsg: string;
	unreadedMsgCnt: number;
};

type TChatSelectableElemState = {
	name: string;
	previewText: string;
	timeLastMsg: string;
	unreadedMsgCnt: number;
};

export class ChatSelectableElem extends BaseComponent<
	TChatSelectableElemState,
	TChatSelectableElemProps
> {
	private readonly imageAvatar = new ImageAvatar({
		alt: "",
		src: "",
		sizeMod: "sm",
	});

	private readonly name = new ChatSelectableElemName({
		text: "",
	});

	private nameLineClamp: TextLineClamp;

	private previewText = new ChatSelectableElemPreviewText({
		text: "",
	});

	private previewTextLineClamp: TextLineClamp;

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TChatSelectableElemState {
		return {
			name: "",
			previewText: "",
			timeLastMsg: "",
			unreadedMsgCnt: 0,
		};
	}

	initChildren(): TChildren {
		this.imageAvatar.build(null);
		this.name.build(null);
		this.previewText.build(null);

		this.nameLineClamp = new TextLineClamp({
			content: this.name.ref,
			countStr: 1,
		});

		this.previewTextLineClamp = new TextLineClamp({
			content: this.previewText.ref,
			countStr: 2,
		});

		this.nameLineClamp.build(null);
		this.previewTextLineClamp.build(null);

		return {
			imageAvatar: this.imageAvatar.ref,
			name: this.nameLineClamp.ref,
			previewText: this.previewTextLineClamp.ref,
		};
	}

	propsToState(): void {
		this.state.name = this.props.name;
		this.state.previewText = this.props.previewText;
		this.state.timeLastMsg = this.props.timeLastMsg;
		this.state.unreadedMsgCnt = this.props.unreadedMsgCnt;

		this.imageAvatar.update({
			sizeMod: "sm",
			src: this.props.src,
			alt: this.props.alt,
		});

		this.name.update({
			text: this.props.name,
		});

		this.previewText.update({
			text: this.props.previewText,
		});
	}
}
