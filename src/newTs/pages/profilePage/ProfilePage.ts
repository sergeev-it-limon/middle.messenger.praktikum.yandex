import { BaseComponent, TChildren } from "../../components/baseComponent";
import { ButtonMain } from "../../components/buttonMain";
import { LeftNavPanel } from "../../components/leftNavPanel";
import { ProfileContent } from "../../components/profileContent";
import { ProfileMenu } from "../../components/profileMenu";
import { eventBus } from "../../controllers/EventBus";
import { CmnPageTmpl } from "../../templates/cmnPageTmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./profilePage.tmpl.js";

export class ProfilePage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const cmnPageTmpl = new CmnPageTmpl(null);

		const leftNavPanel = new LeftNavPanel({ linkTo: "/home" });
		const main = new ProfileContent(null);

		leftNavPanel.build(null);

		main.build(null);

		const content = document.createDocumentFragment();
		content.appendChild(leftNavPanel.ref);
		content.appendChild(main.ref);

		cmnPageTmpl.build({ content });
		return { content: cmnPageTmpl.ref };
	}
}
