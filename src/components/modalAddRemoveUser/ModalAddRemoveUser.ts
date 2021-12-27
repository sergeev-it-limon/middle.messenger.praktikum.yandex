import { ChatsController } from "../../controllers/chatsController";
import { eventBus } from "../../controllers/EventBus";
import { Router } from "../../controllers/Router";
import { UsersController } from "../../controllers/usersController";
import { getFormEntries } from "../../utils/getFormEntries";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { InputString } from "../inputString";
import style from "./modalAddRemoveUser.css";
import { template } from "./modalAddRemoveUser.tmpl.js";

type TModalAddRemoveUserState = {
	outerWrapperClassName: string;
	closeElemClassName: string;
	rootClassName: string;
	headerClassName: string;
	headerText: string;
	inputClassName: string;
	submitClassName: string;
};

type TModalAddRemoveUserProps = {
	typeModal: "add" | "remove";
};

export class ModalAddRemoveUser extends BaseComponent<
	TModalAddRemoveUserState,
	TModalAddRemoveUserProps
> {
	private router = new Router();
	private usersController = new UsersController();
	private chatsController = new ChatsController();

	private handleClose(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_close}`;
	}

	private handleOpen(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_open}`;
	}

	private handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = getFormEntries<{ login: string }>(form);

		if (this.props.typeModal === "remove") {
			this.handleRemoveUser(formData);
		} else {
			this.handleAddUser(formData);
		}
	}

	private handleRemoveUser(formData: { login: string }): void {}

	private async handleAddUser(formData: { login: string }): Promise<void> {
		const userIds = await this.getUserIdsByLogin(formData.login);
		if (userIds === undefined) return;

		const { chatId } = this.router.getParams() ?? {};

		if (typeof chatId !== "string") {
			console.error(`chats id not found ${chatId}`);
			return;
		}

		await this.chatsController.addUsers({
			chatId: Number(chatId),
			users: userIds,
		});

		this.handleClose();
	}

	private async getUserIdsByLogin(
		login: string
	): Promise<number[] | undefined> {
		try {
			const users = await this.usersController.search({ login });
			if (users === null) return;
			return users.map((user) => user.id);
		} catch (e) {
			console.error(e);
			return;
		}
	}

	componentWillInit(): void {
		if (this.props.typeModal == "add") {
			eventBus.subscribe("openAddUser", this.handleOpen.bind(this));
		} else {
			eventBus.subscribe("openRemoveUser", this.handleOpen.bind(this));
		}
	}

	private getButtonText(): string {
		let buttonText = "Тип не определен";

		if (this.props.typeModal === "add") {
			buttonText = "Добавить";
		} else if (this.props.typeModal === "remove") {
			buttonText = "Удалить";
		}

		return buttonText;
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TModalAddRemoveUserState {
		return {
			closeElemClassName: style.closeElem,
			headerClassName: style.header,
			headerText: "",
			inputClassName: style.input,
			outerWrapperClassName: `${style.outerWrapper} ${style.outerWrapper_close}`,
			rootClassName: style.root,
			submitClassName: style.submit,
		};
	}

	propsToState(): void {
		let headerText = "Тип модального окна не определен";

		if (this.props.typeModal === "add") {
			headerText = "Добавить пользователя";
		} else if (this.props.typeModal === "remove") {
			headerText = "Удалить пользователя";
		}

		this.state.headerText = headerText;
	}

	initChildren(): TChildren {
		const inputString = new InputString({
			value: "",
			inputName: "login",
			inputType: "input",
			label: "Логин",
		});

		const buttonMain = new ButtonMain({ text: this.getButtonText() });

		inputString.build(null);
		buttonMain.build(null);

		return {
			inputString: inputString.ref,
			buttonMain: buttonMain.ref,
		};
	}

	initActions(): TActions {
		return {
			handleClose: this.handleClose.bind(this),
			handleSubmit: this.handleSubmit.bind(this),
		};
	}
}
