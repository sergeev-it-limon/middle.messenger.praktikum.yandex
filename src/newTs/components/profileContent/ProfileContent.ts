import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { FormCommon } from "../formCommon/FormCommon";
import { LabeledTextLine } from "../labeledTextLine";
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
		const emailText = new LabeledTextLine({
			labelText: "Почта",
			mainText: "pochta@yandex.ru",
		});
		const loginText = new LabeledTextLine({
			labelText: "Логин",
			mainText: "ivanivanov",
		});
		const nameText = new LabeledTextLine({
			labelText: "Имя",
			mainText: "Иван",
		});
		const surNameText = new LabeledTextLine({
			labelText: "Фамилия",
			mainText: "Иванов",
		});
		const nickText = new LabeledTextLine({
			labelText: "Имя в чате",
			mainText: "Иван",
		});
		const phoneText = new LabeledTextLine({
			labelText: "Телефон",
			mainText: "+7 (909) 967 30 30",
		});

		profileAvatar.build(null);
		pageHeader.build(null);
		emailText.build(null);
		loginText.build(null);
		nameText.build(null);
		surNameText.build(null);
		nickText.build(null);
		phoneText.build(null);

		const top = document.createDocumentFragment();
		top.appendChild(profileAvatar.ref);
		top.appendChild(pageHeader.ref);
		top.appendChild(emailText.ref);
		top.appendChild(loginText.ref);
		top.appendChild(nameText.ref);
		top.appendChild(surNameText.ref);
		top.appendChild(nickText.ref);
		top.appendChild(phoneText.ref);

		content.build({
			top,
			bottom: htmlFromStr("<div>bottom</div>"),
			handleSubmit: () => {},
		});

		return { content: content.ref };
	}
}
