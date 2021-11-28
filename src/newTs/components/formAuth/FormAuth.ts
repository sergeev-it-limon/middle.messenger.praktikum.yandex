import { PageHeader } from "../pageHeader";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import "./formAuth.css";
import style from "./formAuth.css.json";
import { template } from "./formAuth.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";
import { getFormEntries } from "../../utils/getFormEntries";
import { ButtonTransparent } from "../buttonTransparent";
import { buildValidator, rules } from "../../utils/validator";

export class FormAuth extends BaseComponent {
	private handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log(`Сабмит формы авторизации пользователя`);
		console.log(formData);

		setTimeout(() => {
			location.assign("/home");
		}, 3000);
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const { handlers, subscribe } = buildValidator({
			submit: this.handleSubmit,
			rules: {
				login: [
					rules.or({
						message: "Латинница или кириллица без пробелов",
						rules: [rules.latin(), rules.cyrillic()],
					}),
					rules.required(),
				],
				password: [rules.required()],
			},
		});

		const formCommon = new FormCommon({ formClassName: style.form });

		const header = new PageHeader({ text: "Вход" });

		const loginInput = new InputString({
			value: "",
			inputName: "login",
			inputType: "text",
			label: "Логин",
		});

		const passwordInput = new InputString({
			value: "",
			inputName: "password",
			inputType: "password",
			label: "Пароль",
		});

		const buttonAuth = new ButtonMain({
			text: "Авторизоваться",
		});

		const buttonSignup = new ButtonTransparent({
			text: "Нет аккаунта?",
			type: "button",
		});

		header.build(null);
		loginInput.build(null);
		passwordInput.build(null);
		buttonAuth.build(null);

		subscribe(({ name, errors }) => {
			if (name === "login") {
				loginInput.update({
					...loginInput.props,
					errorMessage: errors.join(", "),
				});
			}
			if (name === "password") {
				passwordInput.update({
					...passwordInput.props,
					errorMessage: errors.join(", "),
				});
			}
		});

		const top = document.createDocumentFragment();
		top.appendChild(header.ref);
		top.appendChild(loginInput.ref);
		top.appendChild(passwordInput.ref);

		buttonSignup.build({
			handleClick: () => location.assign("/signup"),
		});

		const bottom = document.createDocumentFragment();
		bottom.appendChild(buttonAuth.ref);
		bottom.appendChild(buttonSignup.ref);

		formCommon.build({
			top,
			bottom,
			handleSubmit: handlers.submit,
			handleFocusIn: handlers.focusIn,
			handleFocusOut: handlers.focusOut,
			handleInput: handlers.input,
		});

		return { content: formCommon.ref };
	}
}
