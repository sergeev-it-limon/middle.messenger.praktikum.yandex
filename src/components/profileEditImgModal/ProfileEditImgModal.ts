import { eventBus } from "../../controllers/EventBus";
import { UsersController } from "../../controllers/usersController";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { InputFile } from "../inputFile";
import style from "./profileEditImgModal.css";
import { template } from "./profileEditImgModal.tmpl.js";
import { FormCommon } from "../formCommon";
import { buildValidator, rules } from "../../utils/validator";

type TProfileEditImgModalState = {
	outerWrapperClassName: string;
	closeElemClassName: string;
	rootClassName: string;
	changeBtnClassName: string;
	headerClassName: string;
	submitClassName: string;
};

export class ProfileEditImgModal extends BaseComponent<
	TProfileEditImgModalState,
	null
> {
	private usersController = new UsersController();
	private handleClose(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_close}`;
	}

	private handleOpen(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_open}`;
	}

	private async handleSubmit(e: SubmitEvent): Promise<void> {
		try {
			const form = e.currentTarget as HTMLFormElement;
			const inputFile = form.querySelector('[name="file"]') as HTMLInputElement;

			const formData = new FormData();
			formData.append("file", inputFile.files[0]);

			await this.usersController.putAvatar(formData);
			this.handleClose();
		} catch (e) {
			console.log(e);
		}
	}

	componentWillInit(): void {
		eventBus.subscribe("openEditAvatar", this.handleOpen.bind(this));
	}

	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TProfileEditImgModalState {
		return {
			closeElemClassName: style.closeElem,
			headerClassName: style.header,
			outerWrapperClassName: `${style.outerWrapper} ${style.outerWrapper_close}`,
			rootClassName: style.root,
			submitClassName: style.submit,
			changeBtnClassName: style.changeBtn,
		};
	}

	initChildren(): TChildren {
		const { handlers } = buildValidator({
			submit: this.handleSubmit.bind(this),
			rules: {
				file: [rules.required()],
			},
			fileInputName: "file",
		});

		const form = new FormCommon({ formClassName: style.form });

		const inputFile = new InputFile({
			text: "Выберите файл на компьютере",
			accept: "image/*",
		});

		const buttonMain = new ButtonMain({ text: "Поменять" });

		inputFile.build(null);
		buttonMain.build(null);

		form.build({
			top: inputFile.ref,
			bottom: buttonMain.ref,
			handleFocusIn: handlers.focusIn,
			handleFocusOut: handlers.focusOut,
			handleInput: handlers.input,
			handleSubmit: handlers.submit,
		});

		return {
			form: form.ref,
		};
	}

	initActions(): TActions {
		return {
			handleClose: this.handleClose.bind(this),
			handleSubmit: (e) => {
				e.preventDefault();
				this.handleClose();
			},
		};
	}
}
