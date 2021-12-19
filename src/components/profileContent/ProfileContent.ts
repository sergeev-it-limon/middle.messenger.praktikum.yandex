import { eventBus } from "../../controllers/EventBus";
import { getFormEntries } from "../../utils/getFormEntries";
import { htmlFromStr } from "../../utils/htmlFrom";
import { appRules, buildValidator, rules } from "../../utils/validator";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import { LabeledTextLine } from "../labeledTextLine";
import { PageHeader } from "../pageHeader";
import { ProfileAvatar } from "../profileAvatar";
import { ProfileEditImgModal } from "../profileEditImgModal";
import { ProfileMenu } from "../profileMenu";
import style from "./profileContent.css";
import { template } from "./profileContent.tmpl.js";

type TProfileContentState = {
	rootClassName: string;
};

export class ProfileContent extends BaseComponent<TProfileContentState, null> {
	private getProfileInfo(): DocumentFragment {
		const fields = [
			new LabeledTextLine({
				label: "Почта",
				value: "pochta@yandex.ru",
			}),
			new LabeledTextLine({
				label: "Логин",
				value: "ivanivanov",
			}),
			new LabeledTextLine({
				label: "Имя",
				value: "Иван",
			}),
			new LabeledTextLine({
				label: "Фамилия",
				value: "Иванов",
			}),
			new LabeledTextLine({
				label: "Имя в чате",
				value: "Иван",
			}),
			new LabeledTextLine({
				label: "Телефон",
				value: "+7 (909) 967 30 30",
			}),
		];

		const fg = document.createDocumentFragment();

		for (const field of fields) {
			field.build(null);
			fg.appendChild(field.ref);
		}

		return fg;
	}

	private getProfileInputs(): InputString[] {
		const fields = [
			new InputString({
				label: "Почта",
				value: "pochta@yandex.ru",
				inputType: "text",
				inputName: "email",
			}),
			new InputString({
				label: "Логин",
				value: "ivanivanov",
				inputType: "text",
				inputName: "login",
			}),
			new InputString({
				label: "Имя",
				value: "Иван",
				inputType: "text",
				inputName: "first_name",
			}),
			new InputString({
				label: "Фамилия",
				value: "Иванов",
				inputType: "text",
				inputName: "second_name",
			}),
			new InputString({
				label: "Имя в чате",
				value: "Иван",
				inputType: "text",
				inputName: "nick",
			}),
			new InputString({
				label: "Телефон",
				value: "+79099673030",
				inputType: "text",
				inputName: "phone",
			}),
		];

		return fields;
	}

	private buildInputs(inputs: InputString[]): DocumentFragment {
		const fg = document.createDocumentFragment();

		for (const input of inputs) {
			input.build(null);
			fg.appendChild(input.ref);
		}

		return fg;
	}

	private getChangePasswordInputs(): DocumentFragment {
		const fields = [
			new InputString({
				label: "Старый пароль",
				value: "",
				inputType: "password",
				inputName: "oldPass",
			}),
			new InputString({
				label: "Новый пароль",
				value: "",
				inputType: "password",
				inputName: "newPass",
			}),
			new InputString({
				label: "Повторите новый пароль",
				value: "",
				inputType: "password",
				inputName: "confirmNewPass",
			}),
		];

		const fg = document.createDocumentFragment();

		for (const field of fields) {
			field.build(null);
			fg.appendChild(field.ref);
		}

		return fg;
	}

	private submitProfile(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log("Сабмит формы редактирования профиля");
		console.log(formData);

		eventBus.emit("editProfileEnd", null);
	}

	private submitPassword(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries(form);

		console.log("Сабмит формы редактирования пароля");
		console.log(formData);

		eventBus.emit("editPasswordEnd", null);
	}

	private getHeader(): DocumentFragment {
		const profileAvatar = new ProfileAvatar(null);
		const pageHeader = new PageHeader({ text: "Иван" });

		profileAvatar.build(null);
		pageHeader.build(null);

		const header = document.createDocumentFragment();
		header.appendChild(profileAvatar.ref);
		header.appendChild(pageHeader.ref);

		return header;
	}

	private getProfileInfoForm(): FormCommon {
		const content = new FormCommon({ formClassName: style.form });

		const top = document.createDocumentFragment();
		top.appendChild(this.getHeader());
		top.appendChild(this.getProfileInfo());

		const profileMenu = new ProfileMenu(null);
		profileMenu.build(null);

		content.build({
			top,
			bottom: profileMenu.ref,
		});

		return content;
	}

	private getEditProfileForm(): FormCommon {
		const { handlers, subscribe } = buildValidator({
			submit: this.submitProfile,
			rules: {
				email: appRules.email,
				login: appRules.login,
				first_name: appRules.name,
				second_name: appRules.name,
				nick: [rules.required()],
				phone: appRules.phone,
			},
		});
		const content = new FormCommon({ formClassName: style.form });

		const inputs = this.getProfileInputs();

		subscribe((error) => {
			const errorMessage = error.errors.join(", ");

			switch (error.name) {
				case "email":
					inputs[0].update({ ...inputs[0].props, errorMessage });
					break;
				case "login":
					inputs[1].update({ ...inputs[1].props, errorMessage });
					break;
				case "first_name":
					inputs[2].update({ ...inputs[2].props, errorMessage });
					break;
				case "second_name":
					inputs[3].update({ ...inputs[3].props, errorMessage });
					break;
				case "nick":
					inputs[4].update({ ...inputs[4].props, errorMessage });
					break;
				case "phone":
					inputs[5].update({ ...inputs[5].props, errorMessage });
					break;
			}
		});

		const top = document.createDocumentFragment();
		top.appendChild(this.getHeader());
		top.appendChild(this.buildInputs(inputs));

		const buttonSubmit = new ButtonMain({ text: "Сохранить" });
		buttonSubmit.build(null);

		content.build({
			top,
			bottom: buttonSubmit.ref,
			handleSubmit: handlers.submit,
			handleFocusIn: handlers.focusIn,
			handleFocusOut: handlers.focusOut,
			handleInput: handlers.input,
		});

		return content;
	}

	private getEditPasswordForm(): FormCommon {
		const content = new FormCommon({ formClassName: style.form });

		const top = document.createDocumentFragment();
		top.appendChild(this.getHeader());
		top.appendChild(this.getChangePasswordInputs());

		const buttonSubmit = new ButtonMain({ text: "Сохранить" });
		buttonSubmit.build(null);

		content.build({
			top,
			bottom: buttonSubmit.ref,
			handleSubmit: this.submitPassword,
		});

		return content;
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TProfileContentState {
		return {
			rootClassName: style.root,
		};
	}

	initChildren(): TChildren {
		const info = this.getProfileInfoForm();
		const editForm = this.getEditProfileForm();
		const passForm = this.getEditPasswordForm();
		const profileEditImgModal = new ProfileEditImgModal(null);
		profileEditImgModal.build(null);

		editForm.hide();
		passForm.hide();

		eventBus.subscribe("editProfileStart", () => {
			info.hide();
			editForm.show();
		});
		eventBus.subscribe("editProfileEnd", () => {
			info.show();
			editForm.hide();
		});
		eventBus.subscribe("editPasswordStart", () => {
			info.hide();
			passForm.show();
		});
		eventBus.subscribe("editPasswordEnd", () => {
			info.show();
			passForm.hide();
		});

		const content = document.createDocumentFragment();

		content.appendChild(info.ref);
		content.appendChild(editForm.ref);
		content.appendChild(passForm.ref);
		content.appendChild(profileEditImgModal.ref);

		return { content };
	}
}
