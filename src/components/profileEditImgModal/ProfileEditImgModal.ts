import { eventBus } from "../../controllers/EventBus";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ButtonMain } from "../buttonMain";
import { ButtonTransparent } from "../buttonTransparent";
import style from "./profileEditImgModal.css";
import { template } from "./profileEditImgModal.tmpl.js";

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
	private handleClose(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_close}`;
	}

	private handleOpen(): void {
		this.state.outerWrapperClassName = `${style.outerWrapper} ${style.outerWrapper_open}`;
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
		const changeBtn = new ButtonTransparent({
			text: "Выберите файл на компьютере",
			type: "button",
		});

		const buttonMain = new ButtonMain({ text: "Поменять" });

		changeBtn.build(null);
		buttonMain.build(null);

		return {
			changeBtn: changeBtn.ref,
			buttonMain: buttonMain.ref,
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
