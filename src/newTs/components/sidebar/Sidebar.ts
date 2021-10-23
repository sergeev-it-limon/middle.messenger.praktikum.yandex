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
		const profileLink = new ProfileLink(null);
		const searchChatForm = new SearchChatForm(null);
		const chatsList = new ChatsList(null);

		profileLink.build();
		searchChatForm.build();
		chatsList.build();

		return {
			profileLink: profileLink.ref,
			searchChatForm: searchChatForm.ref,
			chatsList: chatsList.ref,
		};
	}
}
