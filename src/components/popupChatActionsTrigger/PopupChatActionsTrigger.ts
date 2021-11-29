import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import "./popupChatActionsTrigger.css";
import style from "./popupChatActionsTrigger.css.json";
import { template } from "./popupChatActionsTrigger.tmpl.js";

type TPopupChatActionsTriggerState = {
	className: string;
};
type TPopupChatActionsTriggerProps = {
	isActive: boolean;
};
type TPopupChatActionsTriggerBuildCtx = {
	handleClick: (e: Event) => void;
};

export class PopupChatActionsTrigger extends BaseComponent<
	TPopupChatActionsTriggerState,
	TPopupChatActionsTriggerProps,
	TPopupChatActionsTriggerBuildCtx
> {
	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TPopupChatActionsTriggerState {
		return {
			className: "",
		};
	}

	propsToState(): void {
		const activeClassName = `${style.root} ${style.root_active}`;
		const className = this.props.isActive ? activeClassName : style.root;
		this.state.className = className;
	}

	initActions(): TActions {
		return {
			handleClick: this.buildContext.handleClick,
		};
	}
}
