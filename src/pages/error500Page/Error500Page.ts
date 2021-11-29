import { BaseComponent, TChildren } from "../../components/baseComponent";
import { ErrorPageTmpl } from "../../templates/errorPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import "./error500Page.css";
import { template } from "./error500Page.tmpl.js";

export class Error500Page extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const content = new ErrorPageTmpl(null);

		const header = document.createDocumentFragment();
		header.append("500");

		const main = document.createDocumentFragment();
		main.append("Мы уже фиксим");

		content.build({ header, main });

		return {
			content: content.ref,
		};
	}
}
