import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./divider.tmpl.js";
import style from "./divider.css";

export class Divider extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}
}
