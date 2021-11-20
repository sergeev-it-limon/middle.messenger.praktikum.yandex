import { PageHeader } from "../pageHeader";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import { template } from "./formSignup.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";
import { getFormEntries } from "../../utils/getFormEntries";
import { ButtonTransparent } from "../buttonTransparent";

export class FormSignup extends BaseComponent {
	private handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log(`Сабмит формы регистрации пользователя`);
		console.log(formData);

		setTimeout(() => {
			location.assign("/home");
		}, 3000);
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
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

		const buttonSignup = new ButtonMain({
			text: "Зарегистрироваться",
		});

		const buttonAuth = new ButtonTransparent({ text: "Войти", type: "button" });

		header.build(null);
		buttonSignup.build(null);
		buttonAuth.build({ handleClick: () => location.assign("/") });

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
			handleSubmit: this.handleSubmit.bind(this),
		});

		return { content: formCommon.ref };
	}
}
