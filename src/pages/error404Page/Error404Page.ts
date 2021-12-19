import { BaseComponent, TChildren } from "../../components/baseComponent";
import { ErrorPageTmpl } from "../../templates/errorPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./error404Page.tmpl.js";

export class Error404Page extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const content = new ErrorPageTmpl(null);

		const header = document.createDocumentFragment();
		header.append("404");

		const main = document.createDocumentFragment();
		main.append("Не туда попали");

		content.build({ header, main });

		return {
			content: content.ref,
		};
	}
}
