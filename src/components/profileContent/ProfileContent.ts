import { AuthController } from "../../controllers/authController";
import { eventBus } from "../../controllers/EventBus";
import { getFormEntries } from "../../utils/getFormEntries";
import { htmlFromStr } from "../../utils/htmlFrom";
import { appRules, buildValidator } from "../../utils/validator";
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

type TBuildCtx = {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
} | null;

export class ProfileContent extends BaseComponent<
	TProfileContentState,
	null,
	TBuildCtx
> {
	private authController = new AuthController();
	private isInitInfo = false;

	private initProfileInfo(): void {
		const authInfo = this.authController.getState();
		this.build({
			email: authInfo?.email ?? "",
			first_name: authInfo?.first_name ?? "",
			login: authInfo?.login ?? "",
			display_name: authInfo?.display_name ?? "",
			phone: authInfo?.phone ?? "",
			second_name: authInfo?.second_name ?? "",
		});
	}

	private getProfileInfo(): DocumentFragment {
		const fields = [
			new LabeledTextLine({
				label: "Почта",
				value: this.buildContext?.email ?? "",
			}),
			new LabeledTextLine({
				label: "Логин",
				value: this.buildContext?.login ?? "",
			}),
			new LabeledTextLine({
				label: "Имя",
				value: this.buildContext?.first_name ?? "",
			}),
			new LabeledTextLine({
				label: "Фамилия",
				value: this.buildContext?.second_name ?? "",
			}),
			new LabeledTextLine({
				label: "Имя в чате",
				value: this.buildContext?.display_name ?? "",
			}),
			new LabeledTextLine({
				label: "Телефон",
				value: this.buildContext?.phone ?? "",
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
				value: this.buildContext?.email ?? "",
				inputType: "text",
				inputName: "email",
			}),
			new InputString({
				label: "Логин",
				value: this.buildContext?.login ?? "",
				inputType: "text",
				inputName: "login",
			}),
			new InputString({
				label: "Имя",
				value: this.buildContext?.first_name ?? "",
				inputType: "text",
				inputName: "first_name",
			}),
			new InputString({
				label: "Фамилия",
				value: this.buildContext?.second_name ?? "",
				inputType: "text",
				inputName: "second_name",
			}),
			new InputString({
				label: "Имя в чате",
				value: this.buildContext?.display_name ?? "",
				inputType: "text",
				inputName: "display_name",
			}),
			new InputString({
				label: "Телефон",
				value: this.buildContext?.phone ?? "",
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
		const pageHeader = new PageHeader({
			text:
				this.buildContext?.display_name || this.buildContext?.first_name || "",
		});

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
				phone: appRules.phone,
			},
		});
		const content = new FormCommon({ formClassName: style.form });

		const inputs = this.getProfileInputs();

		subscribe((error) => {
			const updateErr = (err: string, input: InputString): void => {
				input.update({ ...input.props, errorMessage: err });
			};

			const inputsByNames = {
				email: (err: string) => updateErr(err, inputs[0]),
				login: (err: string) => updateErr(err, inputs[1]),
				first_name: (err: string) => updateErr(err, inputs[2]),
				second_name: (err: string) => updateErr(err, inputs[3]),
				phone: (err: string) => updateErr(err, inputs[5]),
			};

			const input = inputsByNames[error.name];
			if (typeof input === "function") {
				const errorMessage = error.errors.join(", ");
				input(errorMessage);
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

	componentWillInit(): void {
		if (this.isInitInfo) return;

		this.isInitInfo = true;
		const state = this.authController.getState();

		if (state === null) {
			eventBus.subscribe("authStateUpdated", this.initProfileInfo.bind(this));
		} else {
			this.initProfileInfo();
		}
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
