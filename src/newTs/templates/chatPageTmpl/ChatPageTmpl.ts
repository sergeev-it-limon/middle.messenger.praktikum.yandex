import { BaseComponent, TChildren } from "../../components/baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatPageTmpl.tmpl.js";
import "./chatPageTmpl.css";
import style from "./chatPageTmpl.css.json";

export abstract class ChatPageTmpl extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		return {
			sidebar: this.initSidebar(),
			mainContent: this.initMainContent(),
			addUserModal: this.initAddUserModal(),
			removeUserModal: this.initRemoveUserModal(),
		};
	}

	abstract initSidebar(): HTMLElement;
	abstract initMainContent(): HTMLElement;
	abstract initAddUserModal(): HTMLElement;
	abstract initRemoveUserModal(): HTMLElement;
}
