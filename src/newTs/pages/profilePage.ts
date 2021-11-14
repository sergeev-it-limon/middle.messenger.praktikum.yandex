import { BaseComponent } from "../components/baseComponent";
import { htmlFromStr } from "../utils/htmlFrom";

export class ProfilePage extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr("<div>profile</div>");
	}
}
