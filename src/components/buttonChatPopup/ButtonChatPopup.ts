import { BaseComponent, TActions } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./buttonChatPopup.tmpl.js";
import style from "./buttonChatPopup.css";

type TButtonChatPopupState = {
	className: string;
	type: string;
	imgSrc: string;
	imgAlt: string;
	imgClassName: string;
	text: string;
	textClassName: string;
};

type TButtonChatPopupProps = {
	type: string;
	imgSrc: string;
	imgAlt: string;
	imgClassName: string;
	text: string;
};

type TButtonChatPopupBuildCtx = {
	handleClick: (e: Event) => void;
};

export class ButtonChatPopup extends BaseComponent<
	TButtonChatPopupState,
	TButtonChatPopupProps,
	TButtonChatPopupBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TButtonChatPopupState {
		return {
			className: style.root,
			imgAlt: this.props.imgAlt,
			imgClassName: this.props.imgClassName,
			imgSrc: this.props.imgSrc,
			text: this.props.text,
			textClassName: style.text,
			type: this.props.type,
		};
	}

	propsToState(): void {
		this.state.className = style.root;
		this.state.imgAlt = this.props.imgAlt;
		this.state.imgClassName = this.props.imgClassName;
		this.state.imgSrc = this.props.imgSrc;
		this.state.text = this.props.text;
		this.state.textClassName = style.text;
		this.state.type = this.props.type;
	}

	initActions(): TActions {
		return {
			handleClick: this.buildContext.handleClick,
		};
	}
}
