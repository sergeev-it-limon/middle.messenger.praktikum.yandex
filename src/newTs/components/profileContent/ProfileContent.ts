import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { FormCommon } from "../formCommon/FormCommon";
import { PageHeader } from "../pageHeader";
import { ProfileAvatar } from "../profileAvatar";
import "./profileContent.css";
import style from "./profileContent.css.json";
import { template } from "./profileContent.tmpl.js";

export class ProfileContent extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const content = new FormCommon({ formClassName: style.root });

		const profileAvatar = new ProfileAvatar(null);
		const pageHeader = new PageHeader({ text: "Иван" });

		profileAvatar.build(null);
		pageHeader.build(null);

		const top = document.createDocumentFragment();
		top.appendChild(profileAvatar.ref);
		top.appendChild(pageHeader.ref);

		content.build({
			top,
			bottom: htmlFromStr("<div>bottom</div>"),
			handleSubmit: () => {},
		});

		return { content: content.ref };
	}
}
