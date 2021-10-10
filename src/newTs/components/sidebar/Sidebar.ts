import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sidebar.tmpl.js";
import "./sidebar.css";
import style from "./sidebar.css.json";
// import { ChatsList } from "../chatsList";
// import { ProfileLink } from "../ProfileLink";
// import { SearchChatForm } from "../searchChatForm";

export class Sidebar extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		return {
			profileLink: htmlFromStr("<div>profileLink</div>"),
			searchChatForm: htmlFromStr("<div>searchChatForm</div>"),
			chatsList: htmlFromStr("<div>chatsList</div>"),
		};
	}
}
