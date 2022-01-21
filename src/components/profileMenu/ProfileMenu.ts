import { AuthController } from "../../controllers/authController";
import { eventBus } from "../../controllers/EventBus";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonTransparent } from "../buttonTransparent";
import { ButtonTransparentRed } from "../buttonTransparentRed";
import { List } from "../list";
import { template } from "./profileMenu.tmpl.js";

export class ProfileMenu extends BaseComponent {
	private handleEdit(): void {
		eventBus.emit("editProfileStart", null);
	}

	private handleChangePass(): void {
		eventBus.emit("editPasswordStart", null);
	}

	private async handleExit(): Promise<void> {
		try {
			const auth = new AuthController();
			await auth.logout();
			location.assign("/");
		} catch (e) {
			console.error(e);
		}
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
