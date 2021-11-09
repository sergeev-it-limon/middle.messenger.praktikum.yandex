import { BaseComponent } from "../components/baseComponent";
import { htmlFromStr } from "../utils/htmlFrom";

export class AuthPage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr("<div>authPage</div>");
	}
}
