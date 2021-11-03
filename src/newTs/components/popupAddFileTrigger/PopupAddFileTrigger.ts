import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./popupAddFileTrigger.tmpl.js";

export class PopupAddFileTrigger extends BaseComponent {
	private handleClick: (e: Event) => void;

	constructor(handleClick: (e: Event) => void) {
		super(null);
		this.handleClick = handleClick;
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initActions(): TActions {
		return {
			handleClick: this.handleClick,
		};
	}
}
