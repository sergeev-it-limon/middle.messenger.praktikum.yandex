import { getClassName } from "../../utils/getClassName";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import style from "./popupChatActionsTrigger.css";
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
		this.state.className = getClassName(style.root, [
			style.root_active,
			this.props.isActive,
		]);
	}

	initActions(): TActions {
		return {
			handleClick: this.buildContext.handleClick,
		};
	}
}
