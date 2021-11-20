import { eventBus } from "../../controllers/EventBus";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonTransparent } from "../buttonTransparent";
import { ButtonTransparentRed } from "../buttonTransparentRed";
import { List } from "../list";
import "./profileMenu.css";
import { template } from "./profileMenu.tmpl.js";

export class ProfileMenu extends BaseComponent {
	private handleEdit(): void {
		eventBus.emit("editProfileStart", null);
	}

	private handleChangePass(): void {
		eventBus.emit("editPasswordStart", null);
	}

	private handleExit(): void {
		location.assign("/");
	}

	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const content = new List({
			liClassName: "",
			ulClassName: "",
		});

		const editButton = new ButtonTransparent({
			text: "Изменить данные",
			type: "button",
		});

		const passButton = new ButtonTransparent({
			text: "Изменить пароль",
			type: "button",
		});

		const exitButton = new ButtonTransparentRed({
			text: "Выйти",
			type: "button",
		});

		editButton.build({ handleClick: this.handleEdit });
		passButton.build({ handleClick: this.handleChangePass });
		exitButton.build({ handleClick: this.handleExit });

		content.build({ items: [editButton.ref, passButton.ref, exitButton.ref] });

		return { content: content.ref };
	}
}
