import { PageHeader } from "../pageHeader";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import "./formAuth.css";
import style from "./formAuth.css.json";
import { template } from "./formAuth.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";

export class FormAuth extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const formCommon = new FormCommon({ formClassName: style.form });

		const header = new PageHeader({ text: "Вход" });

		const loginInput = new InputString({
			defaultValue: "",
			inputName: "auth-login",
			inputType: "text",
			labelText: "Логин",
		});

		const passwordInput = new InputString({
			defaultValue: "",
			inputName: "auth-password",
			inputType: "password",
			labelText: "Пароль",
		});

		const buttonAuth = new ButtonMain({
			text: "Авторизоваться",
		});

		header.build(null);
		loginInput.build(null);
		passwordInput.build(null);
		buttonAuth.build(null);

		const top = document.createDocumentFragment();
		top.appendChild(header.ref);
		top.appendChild(loginInput.ref);
		top.appendChild(passwordInput.ref);

		formCommon.build({
			top,
			bottom: buttonAuth.ref,
		});

		return { content: formCommon.ref };
	}
}
