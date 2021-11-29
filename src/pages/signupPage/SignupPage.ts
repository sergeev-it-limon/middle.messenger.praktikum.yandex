import { BaseComponent, TChildren } from "../../components/baseComponent";
import { FormSignup } from "../../components/formSignup";
import { CmnPageTmpl } from "../../templates/cmnPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./signupPage.tmpl.js";

export class SignupPage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const cmnPageTmpl = new CmnPageTmpl(null);

		const formAuth = new FormSignup(null);
		formAuth.build(null);

		cmnPageTmpl.build({ content: formAuth.ref });

		return {
			content: cmnPageTmpl.ref,
		};
	}
}
