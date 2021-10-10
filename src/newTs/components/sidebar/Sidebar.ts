import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sidebar.tmpl.js";
import "./sidebar.css";
import style from "./sidebar.css.json";
import { ProfileLink } from "../profileLink";
import { SearchChatForm } from "../searchChatForm";
import { ChatsList } from "../chatsList";

export class Sidebar extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		return {
			profileLink: new ProfileLink().ref,
			searchChatForm: new SearchChatForm().ref,
			chatsList: new ChatsList().ref,
		};
	}
}
