import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatStub.tmpl.js";
import style from "./chatStub.css";

export class ChatStub extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}
}
