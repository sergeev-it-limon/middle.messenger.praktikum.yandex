import { PageHeader } from "../pageHeader";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import style from "./formAuth.css";
import { template } from "./formAuth.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";
import { getFormEntries } from "../../utils/getFormEntries";
import { ButtonTransparent } from "../buttonTransparent";
import { appRules, buildValidator } from "../../utils/validator";
import { Router } from "../../controllers/Router";
import { TAuthSignin } from "../../controllers/authController/types";
import { AuthController } from "../../controllers/authController";

export class FormAuth extends BaseComponent {
	private async handleSubmit(e: SubmitEvent): Promise<void> {
		try {
			e.preventDefault();
			const form = e.currentTarget as HTMLFormElement;
			const formData = getFormEntries<TAuthSignin>(form);

			const auth = new AuthController();
			await auth.signin(formData);
			await auth.get();

			const router = new Router();
			router.go("/messenger");
		} catch (e) {
			console.log(e);
		}
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const { handlers, subscribe } = buildValidator({
			submit: this.handleSubmit,
			rules: {
				login: appRules.login,
				password: appRules.password,
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
			handleClick: () => {
				const router = new Router();
				router.go("/sign-up");
			},
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
