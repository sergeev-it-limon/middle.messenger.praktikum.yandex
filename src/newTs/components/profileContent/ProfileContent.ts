import { eventBus } from "../../controllers/EventBus";
import { getFormEntries } from "../../utils/getFormEntries";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { FormCommon } from "../formCommon/FormCommon";
import { InputString } from "../inputString";
import { LabeledTextLine } from "../labeledTextLine";
import { PageHeader } from "../pageHeader";
import { ProfileAvatar } from "../profileAvatar";
import { ProfileMenu } from "../profileMenu";
import "./profileContent.css";
import style from "./profileContent.css.json";
import { template } from "./profileContent.tmpl.js";

type TProfileContentState = {
	rootClassName: string;
};

type TProfileContentBuildCtx = {
	bottom: Node;
};

export class ProfileContent extends BaseComponent<
	TProfileContentState,
	null,
	TProfileContentBuildCtx
> {
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
			eventBus.subscribe("editProfileStart", () => field.hide());
			eventBus.subscribe("editProfileEnd", () => field.show());
			fg.appendChild(field.ref);
		}

		return fg;
	}

	private getProfileInputs(): DocumentFragment {
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
				value: "+7 (909) 967 30 30",
				inputType: "text",
				inputName: "phone",
			}),
		];

		const fg = document.createDocumentFragment();

		for (const field of fields) {
			field.build(null);
			field.hide();
			eventBus.subscribe("editProfileStart", () => field.show());
			eventBus.subscribe("editProfileEnd", () => field.hide());
			fg.appendChild(field.ref);
		}

		return fg;
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
		const content = new FormCommon({ formClassName: style.form });

		const profileAvatar = new ProfileAvatar(null);
		const pageHeader = new PageHeader({ text: "Иван" });

		profileAvatar.build(null);
		pageHeader.build(null);

		const top = document.createDocumentFragment();
		top.appendChild(profileAvatar.ref);
		top.appendChild(pageHeader.ref);
		top.appendChild(this.getProfileInfo());
		top.appendChild(this.getProfileInputs());

		content.build({
			top,
			bottom: this.buildContext.bottom,
			handleSubmit: (e) => {
				e.preventDefault();
				const form = e.currentTarget as HTMLFormElement;
				const formData = getFormEntries(form);

				console.log("Сабмит формы редактирования профиля");
				console.log(formData);

				eventBus.emit("editProfileEnd", null);
			},
		});

		return { content: content.ref };
	}
}
