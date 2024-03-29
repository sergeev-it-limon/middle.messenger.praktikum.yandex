import { PageHeader } from "../pageHeader";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import { template } from "./formSignup.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";
import { getFormEntries } from "../../utils/getFormEntries";
import { ButtonTransparent } from "../buttonTransparent";
import { appRules, buildValidator } from "../../utils/validator";
import { Router } from "../../controllers/Router";
import { AuthController } from "../../controllers/authController/AuthController";
import { TAuthSignup } from "../../controllers/authController/types";

export class FormSignup extends BaseComponent {
	private async handleSubmit(e: SubmitEvent): Promise<void> {
		try {
			e.preventDefault();
			const form = e.currentTarget as HTMLFormElement;
			const formData = getFormEntries<TAuthSignup>(form);

			const auth = new AuthController();

			await auth.signup(formData);
			await auth.get();

			const router = new Router();
			router.go("/messenger");
		} catch (e) {
			console.error(e);
		}
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const { subscribe, handlers } = buildValidator({
			submit: this.handleSubmit.bind(this),
			rules: {
				email: appRules.email,
				login: appRules.login,
				first_name: appRules.name,
				second_name: appRules.name,
				phone: appRules.phone,
				password: appRules.password,
				confirm_password: appRules.password,
			},
		});
		const formCommon = new FormCommon({ formClassName: "" });

		const header = new PageHeader({ text: "Регистрация" });

		const inputs = [
			new InputString({
				value: "",
				inputName: "email",
				inputType: "text",
				label: "Почта",
			}),
			new InputString({
				value: "",
				inputName: "login",
				inputType: "text",
				label: "Логин",
			}),
			new InputString({
				value: "",
				inputName: "first_name",
				inputType: "text",
				label: "Имя",
			}),

			new InputString({
				value: "",
				inputName: "second_name",
				inputType: "text",
				label: "Фамилия",
			}),
			new InputString({
				value: "",
				inputName: "phone",
				inputType: "text",
				label: "Телефон",
			}),
			new InputString({
				value: "",
				inputName: "password",
				inputType: "password",
				label: "Пароль",
			}),
			new InputString({
				value: "",
				inputName: "confirm_password",
				inputType: "password",
				label: "Пароль ещё раз",
			}),
		];

		subscribe((error) => {
			switch (error.name) {
				case "email":
					inputs[0].update({
						...inputs[0].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "login":
					inputs[1].update({
						...inputs[1].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "first_name":
					inputs[2].update({
						...inputs[2].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "second_name":
					inputs[3].update({
						...inputs[3].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "phone":
					inputs[4].update({
						...inputs[4].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "password":
					inputs[5].update({
						...inputs[5].props,
						errorMessage: error.errors.join(", "),
					});
					break;
				case "confirm_password":
					inputs[6].update({
						...inputs[6].props,
						errorMessage: error.errors.join(", "),
					});
					break;
			}
		});

		const buttonSignup = new ButtonMain({
			text: "Зарегистрироваться",
		});

		const buttonAuth = new ButtonTransparent({ text: "Войти", type: "button" });

		header.build(null);
		buttonSignup.build(null);
		buttonAuth.build({
			handleClick: () => {
				const router = new Router();
				router.go("/");
			},
		});

		const top = document.createDocumentFragment();
		top.appendChild(header.ref);

		for (const input of inputs) {
			input.build(null);
			top.appendChild(input.ref);
		}

		const bottom = document.createDocumentFragment();
		bottom.appendChild(buttonSignup.ref);
		bottom.appendChild(buttonAuth.ref);

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
