import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./searchChatForm.tmpl.js";
import { getFormEntries } from "../../utils/getFormEntries";
import { InputSearch } from "../inputSearch";

export class SearchChatForm extends BaseComponent {
	handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log("Сабмит формы поиска чата");
		console.log(formData);
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style: {} }));
	}

	initChildren(): TChildren {
		const inputSearch = new InputSearch({ name: "searchedText" });
		inputSearch.build();

		return {
			inputSearch: inputSearch.ref,
		};
	}

	initActions(): TActions {
		return {
			handleSubmit: this.handleSubmit,
		};
	}
}
