import { Popup, TPopupMeta } from "../popup";
import { PopupAddFileTrigger } from "../popupAddFileTrigger";
import { PopupAddFileContent } from "../popupAddFileContent/PopupAddFileContent";

export class PopupAddFile extends Popup {
	private isOpen = false;
	private trigger: PopupAddFileTrigger;

	private handleTriggerClick(): void {
		this.isOpen = !this.isOpen;
		this.changeOpen(this.isOpen);
		this.trigger.update({ isActive: this.isOpen });
	}

	initPopupContent(): HTMLElement {
		const content = new PopupAddFileContent(null);
		content.build(null);

		return content.ref;
	}

	initTrigger(): HTMLElement {
		this.trigger = new PopupAddFileTrigger(this.handleTriggerClick.bind(this), {
			isActive: this.isOpen,
		});
		this.trigger.build(null);
		return this.trigger.ref;
	}

	initPopupMeta(): TPopupMeta {
		return {
			isOpenDefault: false,
			popupClassName: "",
			position: "top",
			width: "192px",
		};
	}
}
