import { BaseComponent, TChildren } from "../../components/baseComponent";
import { FormAuth } from "../../components/formAuth";
import { CmnPageTmpl } from "../../templates/cmnPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./authPage.tmpl.js";

export class AuthPage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const cmnPageTmpl = new CmnPageTmpl(null);

		const formAuth = new FormAuth(null);
		formAuth.build(null);

		cmnPageTmpl.build({ content: formAuth.ref });

		return {
			content: cmnPageTmpl.ref,
		};
	}
}
