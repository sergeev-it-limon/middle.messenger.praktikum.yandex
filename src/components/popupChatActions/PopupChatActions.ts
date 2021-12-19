import { Popup, TPopupMeta } from "../popup";
import { PopupChatActionsContent } from "../popupChatActionsContent/PopupChatActionsContent";
import { PopupChatActionsTrigger } from "../popupChatActionsTrigger";
import style from "./popupChatActions.css";

export class PopupChatActions extends Popup {
	private isOpen = false;
	private trigger: PopupChatActionsTrigger;

	handleIsOpenChange(): void {
		this.isOpen = !this.isOpen;
		this.trigger.update({ isActive: this.isOpen });
		this.changeOpen(this.isOpen);
	}

	initPopupContent(): HTMLElement {
		const content = new PopupChatActionsContent(null);
		content.build(null);

		return content.ref;
	}

	initTrigger(): HTMLElement {
		this.trigger = new PopupChatActionsTrigger({ isActive: this.isOpen });
		this.trigger.build({ handleClick: this.handleIsOpenChange.bind(this) });

		return this.trigger.ref;
	}

	initPopupMeta(): TPopupMeta {
		return {
			isOpenDefault: false,
			popupClassName: style.root,
			position: "bottom",
			width: "250px",
		};
	}
}
