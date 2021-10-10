import { BaseComponent } from "../../components/baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatPageTmpl.tmpl.js";
import "./chatPageTmpl.css";
import style from "./chatPageTmpl.css.json";

export abstract class ChatPageTmpl extends BaseComponent<{}> {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren() {
		return {
			sidebar: this.initSidebar(),
			mainContent: this.initMainContent(),
		};
	}

	abstract initSidebar(): HTMLElement;
	abstract initMainContent(): HTMLElement;
}
