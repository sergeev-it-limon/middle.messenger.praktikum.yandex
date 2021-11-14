import { BaseComponent, TChildren } from "../../components/baseComponent";
import { CmnPageTmpl } from "../../templates/cmnPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./profilePage.tmpl.js";

export class ProfilePage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const cmnPageTmpl = new CmnPageTmpl(null);

		cmnPageTmpl.build({
			content: htmlFromStr('<div>ProfilePage</div>')
		});

		return {
			content: cmnPageTmpl.ref
		}
	}
}
